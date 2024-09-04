import {
    Badge,
    Card,
    Group,
    Title,
    Flex,
    Box,
    Modal,
    Loader,
    Button,
    Space,
    Text,
    Overlay,
    Center,
    ActionIcon,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import {
    IconCheck,
    IconExclamationCircle,
    IconPencil,
    IconTrash,
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";

import { CompleteQuestResponse, Quest } from "../../types";
import * as api from "../../api";
import { EditQuestModal } from "./EditQuestModal";
import { DeleteQuestModal } from "./DeleteQuestModal";
import { LevelUpModal } from "./LevelUpModal";
import { toDateTime } from "../../utils/date";
import { determineRemainingCooldown } from "../../utils";
import { Cooldown } from "./Cooldown";

const CompleteQuestButton = ({
    quest,
    onComplete,
}: {
    quest: Quest;
    onComplete?: () => void;
}) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<CompleteQuestResponse | null>(null);
    const [cooldownSeconds, setCooldownSeconds] = useState<number>(
        determineRemainingCooldown(quest)
    );
    const [levelUpOpened, { open: openLevelUp, close: closeLevelUp }] =
        useDisclosure(false);

    useEffect(() => {
        setCooldownSeconds(determineRemainingCooldown(quest));
    }, [quest]);

    const completeQuest = async () => {
        try {
            setLoading(true);
            notifications.show({
                message: `+${quest.modifiedXp} XP`,
                color: "transparent",
                withCloseButton: false,
                w: "6rem",
                autoClose: 1000,
                styles: (theme) => ({
                    description: {
                        color: theme.colors.green[7],
                    },
                }),
            });

            const d = await api.completeQuest(quest.id);
            if (d.main.leveledUp || d.sub.leveledUp) {
                window.localStorage.setItem("levelUp", "true");
                setData(d);
                openLevelUp();
            }
            if (onComplete) onComplete();
            setCooldownSeconds(determineRemainingCooldown(quest));
        } catch {
            notifications.show({
                message: "Could not complete quest",
                color: "red",
                icon: <IconExclamationCircle size="1.5rem" />,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Modal
                opened={levelUpOpened}
                onClose={closeLevelUp}
                keepMounted={false}
                centered
                overlayProps={{ backgroundOpacity: 0.5, blur: 3 }}
                style={{ overflow: "visible" }}
            >
                <LevelUpModal
                    data={data!}
                    skill={quest.skill}
                    onAccept={closeLevelUp}
                />
            </Modal>
            <Box pos="relative">
                <Button
                    variant="light"
                    onClick={completeQuest}
                    disabled={loading || cooldownSeconds > 0}
                    w="8.5rem"
                    leftSection={loading ? undefined : <IconCheck />}
                >
                    {loading ? <Loader size="xs" /> : "Complete"}
                </Button>
                {!!cooldownSeconds && (
                    <Overlay style={{ borderRadius: 4 }}>
                        <Center h="100%">
                            <Cooldown
                                remainingSeconds={cooldownSeconds}
                                onComplete={() => setCooldownSeconds(0)}
                            />
                        </Center>
                    </Overlay>
                )}
            </Box>
        </>
    );
};

export const QuestCard = ({
    quest,
    showSkill,
    editing,
    completable,
    onChange,
}: {
    quest: Quest;
    showSkill?: boolean;
    editing?: boolean;
    completable?: boolean;
    onChange?: () => void;
}) => {
    const [loading, setLoading] = useState(false);
    const [editOpened, { open: openEdit, close: closeEdit }] =
        useDisclosure(false);
    const [removeOpened, { open: openRemove, close: closeRemove }] =
        useDisclosure(false);

    const xpIsModified = quest.xp !== quest.modifiedXp;

    return (
        <>
            <Modal
                opened={editOpened}
                onClose={closeEdit}
                keepMounted={false}
                centered
                overlayProps={{ backgroundOpacity: 0.5, blur: 3 }}
                title="Edit Quest"
                style={{ overflow: "visible" }}
            >
                <EditQuestModal
                    loading={loading}
                    onAccept={async (quest) => {
                        try {
                            setLoading(true);
                            await api.updateQuest(quest);
                            notifications.show({
                                message: "Quest updated!",
                                color: "green",
                                icon: <IconCheck size="1.5rem" />,
                            });
                        } catch {
                            notifications.show({
                                message: "Could not update quest",
                                color: "red",
                                icon: <IconExclamationCircle size="1.5rem" />,
                            });
                        } finally {
                            setLoading(false);
                            closeEdit();
                            if (onChange) onChange();
                        }
                    }}
                    onCancel={closeEdit}
                    quest={quest}
                />
            </Modal>
            <Modal
                opened={removeOpened}
                onClose={closeRemove}
                keepMounted={false}
                title="Are you sure?"
                centered
                overlayProps={{ backgroundOpacity: 0.5, blur: 3 }}
            >
                <DeleteQuestModal
                    closeRemove={closeRemove}
                    quest={quest}
                    onChange={onChange}
                />
            </Modal>
            <Card p="xs" withBorder>
                <Flex align="center">
                    <Box flex={1}>
                        <Flex>
                            <Title flex={1} order={5} pr="xs">
                                {quest.title}
                            </Title>
                            <Flex
                                flex="0 0 3rem"
                                gap="xs"
                                align="end"
                                direction="column"
                            >
                                <Badge
                                    color="green"
                                    tt="none"
                                    variant={xpIsModified ? "light" : "filled"}
                                >
                                    <Box
                                        td={
                                            xpIsModified
                                                ? "line-through"
                                                : undefined
                                        }
                                    >
                                        {`+${quest.xp} XP`}
                                    </Box>
                                </Badge>
                                {xpIsModified && (
                                    <Badge tt="none" color="green">
                                        +{quest.modifiedXp} XP
                                    </Badge>
                                )}
                            </Flex>
                        </Flex>
                        <Space h="lg" />
                        <Group justify="space-between" align="end">
                            <Flex direction="column" gap="xs">
                                {showSkill && (
                                    <Badge flex={1} tt="none">
                                        {quest.skill}
                                    </Badge>
                                )}
                                <Text flex={1} fs="italic" c="dimmed" size="xs">
                                    {`Last completion: ${toDateTime(
                                        quest.lastCompleted
                                    )}`}
                                </Text>
                            </Flex>
                            <Group>
                                {editing ? (
                                    <>
                                        <ActionIcon
                                            size="lg"
                                            variant="light"
                                            onClick={openEdit}
                                        >
                                            <IconPencil />
                                        </ActionIcon>
                                        <ActionIcon
                                            color="red"
                                            size="lg"
                                            variant="light"
                                            onClick={openRemove}
                                        >
                                            <IconTrash />
                                        </ActionIcon>
                                    </>
                                ) : (
                                    <>
                                        {completable && (
                                            <CompleteQuestButton
                                                quest={quest}
                                                onComplete={onChange}
                                            />
                                        )}
                                    </>
                                )}
                            </Group>
                        </Group>
                    </Box>
                </Flex>
            </Card>
        </>
    );
};
