import {
    Blockquote,
    Box,
    Button,
    Center,
    Flex,
    Loader,
    Modal,
    Space,
    TextInput,
    Text,
    NumberInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
    IconCheck,
    IconExclamationCircle,
    IconInfoCircle,
} from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { v4 } from "uuid";

import { Quest } from "../types";
import { ReactNode, useState } from "react";
import { Dropdown } from "../Character/Dropdown";
import { cooldowns, skillNames } from "../constants";
import * as api from "../api";

const NewQuestModal = ({
    onAccept,
    onCancel,
    loading,
    prefillSkill,
}: {
    onAccept: (quest: Quest) => void;
    onCancel: () => void;
    loading: boolean;
    prefillSkill?: string;
}) => {
    const [title, setTitle] = useState<string>("");
    const [skill, setSkill] = useState<string>(prefillSkill || "");
    const [cooldown, setCooldown] = useState<string>("Ten minutes");
    const [xp, setXp] = useState<number>(1);

    const disabled = !title || !skill || !xp || !cooldown || loading;

    return (
        <Center>
            <Box w="30rem" maw="100vw">
                <Space h="lg" />
                <Blockquote icon={<IconInfoCircle />}>
                    Create a new quest that challenges you to pick up new
                    habits! Try to make quests that are balanced in difficulty
                    and reward.
                </Blockquote>
                <Space h="lg" />
                <TextInput
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.currentTarget.value)}
                    rightSection={<Text size="xs">{`${title.length}/50`}</Text>}
                    maxLength={50}
                />
                <Space h="md" />
                <Dropdown
                    onChange={setSkill}
                    values={skillNames}
                    value={skill}
                    placeholder=" "
                    label="Skill"
                />
                <Space h="md" />
                <Flex gap="xs">
                    <NumberInput
                        flex={1}
                        min={0.1}
                        max={2}
                        step={0.1}
                        value={xp}
                        onChange={(value) => setXp(Number(value))}
                        label="XP reward"
                    />
                    <Dropdown
                        flex={1}
                        onChange={setCooldown}
                        values={cooldowns}
                        value={cooldown}
                        placeholder=" "
                        label="Cooldown"
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
                            onAccept({
                                id: v4(),
                                title,
                                skill,
                                xp,
                                modifiedXp: xp,
                                cooldown,
                            });
                        }}
                        disabled={disabled}
                    >
                        {loading ? <Loader size="xs" /> : "Create Quest"}
                    </Button>
                </Flex>
            </Box>
        </Center>
    );
};

export const NewQuestButton = ({
    onCreate,
    children,
    skill,
}: {
    onCreate: () => void;
    children?: ReactNode;
    skill?: string;
}) => {
    const [loading, setLoading] = useState(false);
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
            <Modal
                opened={opened}
                onClose={close}
                keepMounted={false}
                title="Create Quest"
                centered
                overlayProps={{
                    backgroundOpacity: 0.5,
                    blur: 3,
                }}
            >
                <NewQuestModal
                    prefillSkill={skill}
                    loading={loading}
                    onAccept={async (quest) => {
                        try {
                            setLoading(true);
                            await api.createQuest(quest);
                            notifications.show({
                                message: "Quest created!",
                                color: "green",
                                icon: <IconCheck size="1.5rem" />,
                            });
                        } catch {
                            notifications.show({
                                message: "Could not create quest",
                                color: "red",
                                icon: <IconExclamationCircle size="1.5rem" />,
                            });
                        } finally {
                            setLoading(false);
                            close();
                            onCreate();
                        }
                    }}
                    onCancel={close}
                />
            </Modal>
            {children ? (
                <Box onClick={open} style={{ cursor: "pointer" }}>
                    {children}
                </Box>
            ) : (
                <Button flex={1} onClick={open}>
                    New Quest
                </Button>
            )}
        </>
    );
};
