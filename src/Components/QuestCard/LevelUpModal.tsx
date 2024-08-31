import {
    Box,
    Button,
    Center,
    Divider,
    Group,
    Space,
    Text,
} from "@mantine/core";
import { IconArrowUp, IconPlus } from "@tabler/icons-react";
import { getLevelName } from "../../utils";
import { CompleteQuestResponse } from "../../types";
import { ItemIcon } from "../ItemIcon";

const LevelUpBox = ({
    newLevel,
    reward,
    skill,
}: {
    newLevel: number;
    reward: { gold: number; item?: string };
    skill?: string;
}) => (
    <Box>
        <Group align="center" gap="xs">
            <IconArrowUp size="2rem" />
            <Text size="xl" fw="bold">
                {!skill ? "Level up!" : `${skill} level up!`}
            </Text>
        </Group>
        <Group align="center" gap="xs" p="xs">
            <Text size="lg">Level {newLevel}:</Text>
            <Text size="lg" fs="italic" c="dimmed">
                {getLevelName(newLevel)}
            </Text>
        </Group>
        <Box p="xs">
            <Group>
                <Group gap="5">
                    <IconPlus size=".8rem" /> {reward.gold}{" "}
                    <ItemIcon name="coin" scale={0.8} />
                </Group>
                {reward.item && (
                    <Text c="gray">
                        <IconPlus size=".8rem" /> {reward.item}
                    </Text>
                )}
            </Group>
        </Box>
    </Box>
);

export const LevelUpModal = ({
    data: { main, sub },
    skill,
    onAccept,
}: {
    data: CompleteQuestResponse;
    skill: string;
    onAccept: () => void;
}) => (
    <Center>
        <Box w="30rem" maw="100vw">
            {main.leveledUp && (
                <LevelUpBox newLevel={main.newLevel!} reward={main.reward!} />
            )}
            {main.leveledUp && sub.leveledUp && (
                <>
                    <Space h="lg" />
                    <Divider />
                    <Space h="lg" />
                </>
            )}
            {sub.leveledUp && (
                <LevelUpBox
                    newLevel={sub.newLevel!}
                    reward={sub.reward!}
                    skill={skill}
                />
            )}
            <Text fs="italic"></Text>
            <Space h="lg" />
            <Group justify="end">
                <Button onClick={onAccept}>Accept</Button>
            </Group>
        </Box>
    </Center>
);
