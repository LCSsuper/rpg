import { useState } from "react";
import {
    Badge,
    Box,
    Card,
    Combobox,
    Divider,
    Flex,
    Grid,
    Group,
    InputBase,
    Space,
    TextInput,
    Title,
    Text,
    useCombobox,
    ActionIcon,
} from "@mantine/core";

import { skills } from "../stores/constants";
import { IconPlus } from "@tabler/icons-react";

const skillNames = skills.map((skill) => skill.name);

const quests = Array.from({ length: 20 }).map((_, index) => ({
    name: `Quest ${index + 1}`,
    skill: skillNames[Math.floor(Math.random() * skillNames.length)],
}));

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
                {quests
                    .filter(
                        (quest) =>
                            (!skillFilter || quest.skill === skillFilter) &&
                            (!search ||
                                quest.name
                                    .toLowerCase()
                                    .includes(search.toLowerCase()))
                    )
                    .map((quest) => (
                        <Grid.Col key={quest.name}>
                            <Card p="xs" withBorder>
                                <Group justify="space-between">
                                    <Title order={5}>{quest.name}</Title>
                                    <Badge color="gray" size="xs" tt="none">
                                        {quest.skill}
                                    </Badge>
                                </Group>
                                <Group justify="space-between">
                                    <Text size="xs" c="violet">
                                        {`+${
                                            [0.1, 0.5, 1, 2][
                                                Math.floor(Math.random() * 4)
                                            ]
                                        } XP`}
                                    </Text>
                                    <ActionIcon size="xs" variant="light">
                                        <IconPlus />
                                    </ActionIcon>
                                </Group>
                            </Card>
                        </Grid.Col>
                    ))}
            </Grid>
        </Box>
    );
};
