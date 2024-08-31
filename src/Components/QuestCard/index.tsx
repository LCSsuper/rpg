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
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import {
    IconCheck,
    IconExclamationCircle,
    IconPencil,
    IconTrash,
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

import { CompleteQuestResponse, Quest } from "../../types";
import * as api from "../../api";
import { EditQuestModal } from "./EditQuestModal";
import { DeleteQuestModal } from "./DeleteQuestModal";
import { LevelUpModal } from "./LevelUpModal";

const CompleteQuestButton = ({ quest }: { quest: Quest }) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<CompleteQuestResponse | null>(null);
    const [levelUpOpened, { open: openLevelUp, close: closeLevelUp }] =
        useDisclosure(false);

    const completeQuest = async () => {
        try {
            setLoading(true);
            notifications.show({
                message: `+${quest.xp} XP`,
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
            <Button
                variant="light"
                onClick={completeQuest}
                disabled={loading}
                w="8.5rem"
                leftSection={loading ? undefined : <IconCheck />}
            >
                {loading ? <Loader size="xs" /> : "Complete"}
            </Button>
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
                            <Group flex="0 0 3rem" justify="end" align="start">
                                <Badge color="green" tt="none">
                                    {`+${quest.xp} XP`}
                                </Badge>
                            </Group>
                        </Flex>
                        <Space h="lg" />
                        <Group justify="space-between" align="end">
                            <Group gap="xs">
                                {showSkill && (
                                    <Badge tt="none">{quest.skill}</Badge>
                                )}
                            </Group>
                            <Group>
                                {editing ? (
                                    <>
                                        <Button
                                            variant="light"
                                            onClick={openEdit}
                                            w="6rem"
                                            leftSection={<IconPencil />}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            color="red"
                                            variant="light"
                                            onClick={openRemove}
                                            w="7rem"
                                            leftSection={<IconTrash />}
                                        >
                                            Delete
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        {completable && (
                                            <CompleteQuestButton
                                                quest={quest}
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
