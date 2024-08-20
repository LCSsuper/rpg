import { useState } from "react";
import {
    Box,
    Button,
    Center,
    Divider,
    Flex,
    Grid,
    Space,
    TextInput,
    Title,
} from "@mantine/core";

import { QuestCard } from "../Components/QuestCard";
import { skillNames } from "../constants";
import * as api from "../api";
import { FetchedBox } from "../Components/FetchedBox";
import { Quest } from "../types";
import { Dropdown } from "../Character/Dropdown";
import { NewQuestButton } from "./NewQuestButton";

export const Quests = () => {
    const [search, setSearch] = useState("");
    const [skillFilter, setSkillFilter] = useState("");
    const [randomId, forceUpdate] = useState(0);
    const [editing, setEditing] = useState(false);

    return (
        <Box key={randomId}>
            <Title size="3rem">Quests</Title>
            <Space h="lg" />
            <Flex gap="xs">
                <NewQuestButton
                    onCreate={() => {
                        forceUpdate(Math.random());
                    }}
                />
                <Button
                    flex={1}
                    onClick={() => setEditing(!editing)}
                    variant="light"
                >
                    {editing ? "Stop editing" : "Edit Quests"}
                </Button>
            </Flex>
            <Space h="md" />
            <Divider />
            <Space h="md" />
            <Flex gap="xs">
                <TextInput
                    flex={1}
                    placeholder="Search quests"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                    }}
                />
                <Dropdown
                    onChange={(skill) => {
                        setSkillFilter(skill);
                    }}
                    values={skillNames}
                    value={skillFilter}
                    placeholder="Filter by skill"
                />
            </Flex>
            <Space h="md" />
            <Grid>
                <FetchedBox<Quest[]>
                    queryKey={["getQuests"]}
                    queryFn={api.getQuests}
                    error="Could not load quests"
                >
                    {(quests) => {
                        const filteredQuests = quests.filter(
                            (quest) =>
                                (!skillFilter || quest.skill === skillFilter) &&
                                (!search ||
                                    quest.title
                                        .toLowerCase()
                                        .includes(search.toLowerCase()))
                        );

                        return (
                            <>
                                {(!quests.length || !filteredQuests.length) && (
                                    <Center>
                                        <Title order={5} pt="lg" c="dimmed">
                                            {!quests.length
                                                ? "No quests..."
                                                : "No quests in filter..."}
                                        </Title>
                                    </Center>
                                )}
                                {filteredQuests.map((quest) => (
                                    <Grid.Col key={quest.title}>
                                        <QuestCard
                                            quest={quest}
                                            showSkill
                                            editing={editing}
                                            onChange={() => {
                                                forceUpdate(Math.random());
                                            }}
                                        />
                                    </Grid.Col>
                                ))}
                            </>
                        );
                    }}
                </FetchedBox>
            </Grid>
        </Box>
    );
};
