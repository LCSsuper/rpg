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
import { useState } from "react";
import { Dropdown } from "../Character/Dropdown";
import { skillNames } from "../constants";
import * as api from "../api";

const NewQuestModal = ({
    onAccept,
    onCancel,
    loading,
}: {
    onAccept: (quest: Quest) => void;
    onCancel: () => void;
    loading: boolean;
}) => {
    const [title, setTitle] = useState<string>("");
    const [skill, setSkill] = useState<string>("");
    const [xp, setXp] = useState<number | undefined>(undefined);

    const disabled = !title || !skill || !xp || loading;

    return (
        <Center>
            <Box w="30rem" maw="100vw">
                <Space h="lg" />
                <Blockquote icon={<IconInfoCircle />}>
                    Create a new quest to challenges you to pick up new habits!
                    Try to make quests that are balanced in difficulty and
                    reward.
                </Blockquote>
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
                        label="Skill"
                    />
                    <Dropdown
                        flex={1}
                        onChange={(xpString) => setXp(Number(xpString))}
                        values={[0.1, 0.5, 1, 2]}
                        value={xp}
                        placeholder="Choose XP reward"
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
                            onAccept({ id: v4(), title, skill, xp });
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

export const NewQuestButton = ({ onCreate }: { onCreate: () => void }) => {
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
            <Button flex={1} onClick={open}>
                New Quest
            </Button>
        </>
    );
};
