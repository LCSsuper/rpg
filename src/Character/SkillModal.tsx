import {
    Badge,
    Box,
    Center,
    Grid,
    Group,
    Progress,
    Space,
    Title,
} from "@mantine/core";

import { Quest, Skill } from "../types";
import { QuestCard } from "../Components/QuestCard";
import { FetchedBox } from "../Components/FetchedBox";
import * as api from "../api";
import { NewQuestCard } from "../Components/NewQuestCard";

export const SkillModal = ({
    skill,
    onCompleteQuest,
}: {
    skill: Skill | null;
    onCompleteQuest: () => void;
}) => {
    if (!skill) return null;

    return (
        <Center>
            <Box w="30rem" maw="100vw">
                <Title size="3rem">{skill.name}</Title>
                <Progress value={skill.level?.progress || 0} size="lg" />
                <Space h="xs" />
                <Group justify="space-between">
                    <Group>
                        <Title order={2}>Level {skill.level?.level || 1}</Title>
                        <Title order={4} c="dimmed">
                            {skill.level?.title || "Beginner"}
                        </Title>
                    </Group>
                    <Badge color="cyan" tt="none" size="lg">
                        {skill.type}
                    </Badge>
                </Group>
                <Space h="lg" />
                <Space h="lg" />
                <Title order={4}>Quests in this skill:</Title>
                <Space h="md" />
                <Grid>
                    <FetchedBox<Quest[]>
                        queryKey={["getQuests", skill.name]}
                        queryFn={() => api.getQuests(skill.name)}
                        error="Could not load quests"
                        withinPortal
                    >
                        {(quests, refetch) => (
                            <>
                                {!quests.length && (
                                    <Center>
                                        <Title order={5} pt="lg" c="dimmed">
                                            No quests
                                        </Title>
                                    </Center>
                                )}
                                {quests.map((quest) => (
                                    <Grid.Col key={quest.title}>
                                        <QuestCard
                                            quest={quest}
                                            completable
                                            onChange={() => {
                                                onCompleteQuest();
                                                refetch();
                                            }}
                                        />
                                    </Grid.Col>
                                ))}
                                <Grid.Col>
                                    <NewQuestCard
                                        skill={skill.name}
                                        onCreate={refetch}
                                    />
                                </Grid.Col>
                            </>
                        )}
                    </FetchedBox>
                </Grid>
            </Box>
        </Center>
    );
};
