import { Card, Group, Space, Progress, Badge, Text } from "@mantine/core";
import { Skill } from "../types";

export const SkillCard = ({
    skill,
    onInfo,
}: {
    skill: Skill;
    onInfo: () => void;
}) => {
    return (
        <Card p="xs" withBorder onClick={onInfo}>
            <Text size="sm" truncate>
                {skill.name}
            </Text>
            <Space h="xs" />
            <Progress value={skill.level?.progress || 0} size="md" />
            <Space h="xs" />
            <Group justify="space-between">
                <Text size="sm" c="dimmed">
                    Level {skill.level?.level || 0}
                </Text>
                <Badge color="cyan" size="xs" tt="none">
                    {skill.type}
                </Badge>
            </Group>
        </Card>
    );
};
