import { Card, Center, Group, Text } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { NewQuestButton } from "./NewQuestButton";

export const NewQuestCard = ({
    skill,
    onCreate,
}: {
    skill: string;
    onCreate: () => void;
}) => {
    return (
        <NewQuestButton onCreate={onCreate} skill={skill}>
            <Card>
                <Center h="4rem">
                    <Group gap="xs">
                        <Text c="dimmed" h="1.5rem">
                            <IconPlus size="1.5rem" />
                        </Text>
                        <Text size="sm" c="dimmed">
                            Create new quest
                        </Text>
                    </Group>
                </Center>
            </Card>
        </NewQuestButton>
    );
};
