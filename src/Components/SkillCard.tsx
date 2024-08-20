import {
    Card,
    Group,
    ActionIcon,
    Space,
    Progress,
    Badge,
    Text,
    Flex,
} from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import { Skill } from "../types";

export const SkillCard = ({
    skill,
    onInfo,
}: {
    skill: Skill;
    onInfo: () => void;
}) => {
    return (
        <Card p="xs" withBorder>
            <Flex gap="xs">
                <Text flex={1} size="sm" truncate>
                    {skill.name}
                </Text>
                <ActionIcon
                    flex={0}
                    size="xs"
                    variant="light"
                    onClick={() => {
                        onInfo();
                    }}
                >
                    <IconInfoCircle />
                </ActionIcon>
            </Flex>
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
