import { useState } from "react";
import {
    Box,
    Center,
    Combobox,
    Divider,
    Flex,
    Grid,
    InputBase,
    Space,
    TextInput,
    Title,
    useCombobox,
} from "@mantine/core";

import { QuestCard } from "../Components/QuestCard";
import { skillNames } from "../constants";
import * as api from "../api";
import { FetchedBox } from "../Components/FetchedBox";
import { Quest } from "../types";

export const FilterDropdown = ({
    label,
    placeholder,
    disabled,
    value,
    values,
    onChange,
}: {
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    value?: string;
    values: string[];
    onChange: (value: string) => void;
}) => {
    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    });

    const options = values.map((value) => (
        <Combobox.Option value={value} key={value}>
            {value}
        </Combobox.Option>
    ));

    return (
        <Combobox
            width={"10rem"}
            store={combobox}
            withinPortal={false}
            onOptionSubmit={(val) => {
                onChange(val);
                combobox.closeDropdown();
            }}
        >
            <Combobox.Target>
                <InputBase
                    w={"10rem"}
                    label={label}
                    disabled={disabled}
                    component="button"
                    type="button"
                    pointer
                    rightSection={<Combobox.Chevron />}
                    onClick={() => combobox.toggleDropdown()}
                    rightSectionPointerEvents="none"
                >
                    {value || placeholder || "Filter..."}
                </InputBase>
            </Combobox.Target>

            <Combobox.Dropdown
                mah="10rem"
                styles={{ dropdown: { overflow: "scroll" } }}
            >
                <Combobox.Options>
                    <Combobox.Option value={""}>all</Combobox.Option>
                    {options}
                </Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>
    );
};

export const Quests = () => {
    const [search, setSearch] = useState("");
    const [skillFilter, setSkillFilter] = useState("");

    return (
        <Box>
            <Title size="3rem">Quests</Title>
            <Space h="lg" />
            <Flex gap="xs">
                <TextInput
                    flex={1}
                    placeholder="Search quests"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                    }}
                />
                <FilterDropdown
                    onChange={(skill) => {
                        setSkillFilter(skill);
                    }}
                    values={skillNames}
                    value={skillFilter}
                    placeholder="Filter by skill"
                />
            </Flex>
            <Space h="md" />
            <Divider />
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
                                        <QuestCard quest={quest} showSkill />
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
