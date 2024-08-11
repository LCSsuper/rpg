import {
    ActionIcon,
    Badge,
    Card,
    Group,
    Title,
    Text,
    Flex,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconPlus } from "@tabler/icons-react";
import { Quest } from "../types";

export const QuestCard = ({
    quest,
    showSkill,
}: {
    quest: Quest;
    showSkill?: boolean;
}) => {
    return (
        <Card p="xs" withBorder>
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
                <ActionIcon size="xs" variant="light">
                    <IconPlus
                        onClick={() => {
                            notifications.show({
                                message: `Quest "${quest.title}" completed!`,
                                color: "violet",
                                autoClose: 2000,
                            });
                        }}
                    />
                </ActionIcon>
            </Group>
        </Card>
    );
};
