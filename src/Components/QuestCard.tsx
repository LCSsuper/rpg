import {
    ActionIcon,
    Badge,
    Card,
    Group,
    Title,
    Text,
    Flex,
    Box,
    Button,
    Center,
    Space,
    TextInput,
    Modal,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import {
    IconCheck,
    IconExclamationCircle,
    IconPencil,
    IconPlus,
    IconTrash,
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";

import { Quest } from "../types";
import { useState } from "react";
import { Dropdown } from "../Character/Dropdown";
import { skillNames } from "../constants";
import * as api from "../api";

const EditQuestModal = ({
    onAccept,
    onCancel,
    quest,
}: {
    onAccept: (quest: Quest) => void;
    onCancel: () => void;
    quest: Quest;
}) => {
    const [title, setTitle] = useState<string>(quest.title);
    const [skill, setSkill] = useState<string>(quest.skill);
    const [xp, setXp] = useState<number>(quest.xp);

    const disabled = !title || !skill || !xp;

    return (
        <Center>
            <Box w="30rem" maw="100vw">
                <Title size="3rem">Edit Quest</Title>
                <Space h="lg" />
                <TextInput
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.currentTarget.value)}
                />
                <Space h="md" />
                <Flex gap="xs">
                    <Dropdown
                        flex={1}
                        onChange={setSkill}
                        values={skillNames}
                        value={skill}
                        placeholder="Choose a skill"
                        allowSelectAll={false}
                        label="Skill"
                    />
                    <Dropdown
                        flex={1}
                        onChange={(xpString) => setXp(Number(xpString))}
                        values={[0.1, 0.5, 1, 2]}
                        value={xp}
                        placeholder="Choose XP reward"
                        allowSelectAll={false}
                        label="XP reward"
                    />
                </Flex>
                <Space h="lg" />
                <Flex gap="sm">
                    <Button flex={1} onClick={onCancel} variant="light">
                        Cancel
                    </Button>
                    <Button
                        flex={1}
                        onClick={() => {
                            if (!title || !skill || !xp) return;
                            onAccept({ id: quest.id, title, skill, xp });
                        }}
                        disabled={disabled}
                    >
                        Update Quest
                    </Button>
                </Flex>
            </Box>
        </Center>
    );
};

export const QuestCard = ({
    quest,
    showSkill,
    editing,
    onChange,
}: {
    quest: Quest;
    showSkill?: boolean;
    editing?: boolean;
    onChange?: () => void;
}) => {
    const [editOpened, { open: openEdit, close: closeEdit }] =
        useDisclosure(false);
    const [removeOpened, { open: openRemove, close: closeRemove }] =
        useDisclosure(false);

    return (
        <>
            <Modal
                opened={editOpened}
                onClose={closeEdit}
                fullScreen
                keepMounted={false}
            >
                <EditQuestModal
                    onAccept={async (quest) => {
                        try {
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
            >
                <Center>
                    <Box w="30rem" maw="100vw">
                        <Text size="lg">
                            Are you sure you want to delete quest:
                        </Text>
                        <Text fs="italic">{quest.title}</Text>
                        <Space h="lg" />
                        <Flex gap="sm">
                            <Button
                                flex={1}
                                onClick={closeRemove}
                                variant="light"
                            >
                                Cancel
                            </Button>
                            <Button
                                flex={1}
                                onClick={async () => {
                                    try {
                                        await api.deleteQuest(quest);
                                        notifications.show({
                                            message: "Quest deleted!",
                                            color: "green",
                                            icon: <IconCheck size="1.5rem" />,
                                        });
                                    } catch {
                                        notifications.show({
                                            message: "Could not delete quest",
                                            color: "red",
                                            icon: (
                                                <IconExclamationCircle size="1.5rem" />
                                            ),
                                        });
                                    } finally {
                                        closeRemove();
                                        if (onChange) onChange();
                                    }
                                }}
                            >
                                Delete Quest
                            </Button>
                        </Flex>
                    </Box>
                </Center>
            </Modal>
            <Card p="xs" withBorder>
                <Flex align="center">
                    <Box flex={1}>
                        <Flex>
                            <Title flex={1} order={5}>
                                {quest.title}
                            </Title>
                            <Group flex="0 0 3rem" justify="end" align="start">
                                <Text size="xs" c="green">
                                    {`+${quest.xp} XP`}
                                </Text>
                            </Group>
                        </Flex>
                        <Group justify="space-between">
                            <Group gap="xs">
                                {showSkill && (
                                    <Badge size="xs" tt="none">
                                        {quest.skill}
                                    </Badge>
                                )}
                            </Group>
                            <Group>
                                {editing ? (
                                    <>
                                        <ActionIcon
                                            size="sm"
                                            variant="light"
                                            onClick={openEdit}
                                        >
                                            <IconPencil />
                                        </ActionIcon>
                                        <ActionIcon
                                            size="sm"
                                            variant="light"
                                            color="red"
                                            onClick={openRemove}
                                        >
                                            <IconTrash />
                                        </ActionIcon>
                                    </>
                                ) : (
                                    <ActionIcon size="sm" variant="light">
                                        <IconPlus
                                            onClick={async () => {
                                                try {
                                                    await api.completeQuest(
                                                        quest
                                                    );
                                                    notifications.show({
                                                        message: `+${quest.xp} XP`,
                                                        color: "green",
                                                        icon: (
                                                            <IconCheck size="1.5rem" />
                                                        ),
                                                        w: "10rem",
                                                        styles: (theme) => ({
                                                            description: {
                                                                color: theme
                                                                    .colors
                                                                    .green[7],
                                                            },
                                                        }),
                                                    });
                                                } catch {
                                                    notifications.show({
                                                        message:
                                                            "Could not complete quest",
                                                        color: "red",
                                                        icon: (
                                                            <IconExclamationCircle size="1.5rem" />
                                                        ),
                                                    });
                                                }
                                            }}
                                        />
                                    </ActionIcon>
                                )}
                            </Group>
                        </Group>
                    </Box>
                </Flex>
            </Card>
        </>
    );
};
