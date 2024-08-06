import { useState } from "react";
import {
    ActionIcon,
    Badge,
    Box,
    Card,
    Center,
    Grid,
    Group,
    Modal,
    Progress,
    Space,
    Text,
    Title,
} from "@mantine/core";
import { IconInfoCircle, IconPlus } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";

import { skills } from "../stores/constants";
import { Skill } from "../stores/types";

export const SkillModal = ({ skill }: { skill: Skill | null }) => {
    if (!skill) return null;

    const quests = Array.from({ length: 5 }).map((_, index) => ({
        name: `Quest ${index + 1}`,
    }));

    return (
        <Center>
            <Box w="30rem" maw="100vw">
                <Title size="3rem">{skill.name}</Title>
                <Progress value={Math.random() * 100} size="lg" />
                <Space h="xs" />
                <Group justify="space-between">
                    <Group>
                        <Title order={2}>Level 5</Title>
                        <Title order={4} c="dimmed">
                            Beginner
                        </Title>
                    </Group>
                    <Badge color="gray" tt="none" size="lg">
                        {skill.type}
                    </Badge>
                </Group>
                <Space h="lg" />
                <Space h="lg" />
                <Title order={4}>Quests in this skill:</Title>
                <Space h="md" />
                <Grid>
                    {quests.map((quest) => (
                        <Grid.Col key={quest.name}>
                            <Card p="xs" withBorder>
                                <Group justify="space-between">
                                    <Text size="sm">{quest.name}</Text>
                                    <ActionIcon size="xs" variant="light">
                                        <IconPlus />
                                    </ActionIcon>
                                </Group>
                            </Card>
                        </Grid.Col>
                    ))}
                </Grid>
            </Box>
        </Center>
    );
};

export const Character = () => {
    const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
    const [skillModalOpened, { open: openSkillModal, close: closeSkillModal }] =
        useDisclosure(false);

    return (
        <Box>
            <Modal
                opened={skillModalOpened}
                onClose={closeSkillModal}
                fullScreen
            >
                <SkillModal skill={selectedSkill} />
            </Modal>
            <div
                style={{
                    position: "relative",
                    height: "15rem",
                }}
            >
                <div
                    style={{
                        height: "20rem",
                        overflow: "hidden",
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        zIndex: -1,
                    }}
                >
                    <img
                        src="character.png"
                        alt="Character"
                        style={{ width: "100%" }}
                    />
                </div>
                <div
                    style={{
                        position: "absolute",
                        left: 0,
                        bottom: "-5rem",
                        right: 0,
                        height: "7rem",
                        background:
                            "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #242424 70%, #242424 100%)",
                        zIndex: -1,
                    }}
                ></div>
            </div>

            <Group align="end">
                <Group gap="xs" align="end">
                    <Title order={2} pb="xs">
                        Level
                    </Title>
                    <Title order={1} size="3rem">
                        1
                    </Title>
                </Group>
                <Title order={3} c="dimmed" pb="xs">
                    Beginner
                </Title>
            </Group>
            <Progress value={50} size="xl" />
            <Space h="lg" />
            <Space h="lg" />
            <Title order={1}>Skills</Title>
            <Space h="md" />
            <Grid>
                {skills.map((skill) => (
                    <Grid.Col key={skill.name} span={6}>
                        <Card p="xs" withBorder>
                            <Group justify="space-between" gap="xs">
                                <Text size="sm">{skill.name}</Text>
                                <ActionIcon
                                    size="xs"
                                    variant="light"
                                    onClick={() => {
                                        setSelectedSkill(skill);
                                        openSkillModal();
                                    }}
                                >
                                    <IconInfoCircle />
                                </ActionIcon>
                            </Group>
                            <Space h="xs" />
                            <Progress value={Math.random() * 100} size="md" />
                            <Space h="xs" />
                            <Group justify="space-between">
                                <Text size="sm" c="dimmed">
                                    Level {Math.floor(Math.random() * 100)}
                                </Text>
                                <Badge color="gray" size="xs" tt="none">
                                    {skill.type}
                                </Badge>
                            </Group>
                        </Card>
                    </Grid.Col>
                ))}
            </Grid>
        </Box>
    );
};
