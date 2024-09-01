import {
    Center,
    Box,
    TextInput,
    Space,
    Flex,
    Button,
    Loader,
} from "@mantine/core";
import { useState } from "react";

import { Dropdown } from "../../Character/Dropdown";
import { skillNames } from "../../constants";
import { Quest } from "../../types";

export const EditQuestModal = ({
    onAccept,
    onCancel,
    quest,
    loading,
}: {
    onAccept: (quest: Quest) => void;
    onCancel: () => void;
    quest: Quest;
    loading: boolean;
}) => {
    const [title, setTitle] = useState<string>(quest.title);
    const [skill, setSkill] = useState<string>(quest.skill);
    const [xp, setXp] = useState<number>(quest.xp);

    const disabled = !title || !skill || !xp || loading;

    return (
        <Center>
            <Box w="30rem" maw="100vw">
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
                        onChange={(xpString: string) => setXp(Number(xpString))}
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
                            onAccept({
                                id: quest.id,
                                title,
                                skill,
                                xp,
                                modifiedXp: xp,
                            });
                        }}
                        disabled={disabled}
                    >
                        {loading ? <Loader size="xs" /> : "Update Quest"}
                    </Button>
                </Flex>
            </Box>
        </Center>
    );
};
