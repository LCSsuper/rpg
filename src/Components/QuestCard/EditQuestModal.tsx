import {
    Center,
    Box,
    TextInput,
    Space,
    Flex,
    Button,
    Loader,
    Text,
    NumberInput,
} from "@mantine/core";
import { useState } from "react";

import { Dropdown } from "../../Character/Dropdown";
import { cooldowns, skillNames } from "../../constants";
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
    const [cooldown, setCooldown] = useState<string>(
        quest.cooldown || "No cooldown"
    );
    const [xp, setXp] = useState<number>(quest.xp);

    const disabled = !title || !skill || !xp || loading;

    return (
        <Center>
            <Box w="30rem" maw="100vw">
                <TextInput
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.currentTarget.value)}
                    maxLength={50}
                    rightSection={<Text size="xs">{`${title.length}/50`}</Text>}
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
                                id: quest.id,
                                title,
                                skill,
                                xp,
                                modifiedXp: xp,
                                cooldown,
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
