import { useState } from "react";
import {
    Accordion,
    Box,
    Card,
    Center,
    Grid,
    Group,
    Modal,
    Overlay,
    Progress,
    RingProgress,
    Space,
    Title,
    Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { skills } from "../constants";
import { Character, Skill } from "../types";
import { SkillCard } from "../Components/SkillCard";
import { getMainLevel, getSkillLevel } from "../utils";
import { SkillModal } from "./SkillModal";
import {
    IconCash,
    IconCoin,
    IconInfinity,
    IconSword,
} from "@tabler/icons-react";

const characterImages = [
    { threshold: 84, src: "./character7.png" },
    { threshold: 70, src: "./character6.png" },
    { threshold: 56, src: "./character5.png" },
    { threshold: 42, src: "./character4.png" },
    { threshold: 28, src: "./character3.webp" },
    { threshold: 14, src: "./character2.webp" },
    { threshold: 0, src: "./character1.webp" },
];

export const CharacterBox = ({
    character,
    colorTheme,
}: {
    character: Character;
    colorTheme: "light" | "dark";
}) => {
    const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
    const [skillModalOpened, { open: openSkillModal, close: closeSkillModal }] =
        useDisclosure(false);

    const mainLevel = getMainLevel(character.xp);
    const color = colorTheme === "light" ? "#fff" : "#242424";

    return (
        <Box>
            <Modal
                opened={skillModalOpened}
                onClose={closeSkillModal}
                fullScreen
                keepMounted={false}
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
                        src={
                            characterImages.find(
                                ({ threshold }) => mainLevel.level > threshold
                            )?.src
                        }
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
                        background: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, ${color} 70%, ${color} 100%)`,
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
                        {mainLevel.level}
                    </Title>
                </Group>
                <Title order={4} c="dimmed" pb="xs">
                    {mainLevel.title}
                </Title>
            </Group>
            <Progress.Root size="xl">
                <Progress.Section value={mainLevel.progress}>
                    <Progress.Label>
                        {`${mainLevel.xpGatheredInLevel} / ${
                            mainLevel.xpNeededToNextLevel ||
                            mainLevel.xpGatheredInLevel
                        }`}
                    </Progress.Label>
                </Progress.Section>
            </Progress.Root>
            <Space h="lg" />
            <Space h="lg" />
            <Accordion
                styles={{
                    item: { border: "none" },
                    content: { padding: "0" },
                }}
            >
                <Accordion.Item value="inventory">
                    <Accordion.Control p={0}>
                        <Group align="center" justify="space-between" pr="sm">
                            <Title order={1}>Inventory</Title>
                            <Group gap={5} align="center">
                                <Title order={5} c="dimmed" h="1.3rem">
                                    100
                                </Title>
                                <Text c="yellow" h="1.3rem">
                                    <IconCoin size="1.2rem" />
                                </Text>
                            </Group>
                        </Group>
                    </Accordion.Control>
                    <Accordion.Panel p={0}>
                        <Space h="lg" />
                        <Title order={3}>Items</Title>
                        <Grid>
                            {Array.from({ length: 8 }).map((_, index) => (
                                <Grid.Col span={3} key={index}>
                                    <Card withBorder h="4.5rem">
                                        <Center h="100%">
                                            {index < 3 && <IconSword />}
                                        </Center>
                                    </Card>
                                </Grid.Col>
                            ))}
                        </Grid>
                        <Space h="lg" />
                        <Title order={3}>Active items</Title>
                        <Grid>
                            {Array.from({ length: 4 }).map((_, index) => (
                                <Grid.Col span={3} key={index}>
                                    <Card withBorder h="4.5rem">
                                        <Center h="100%">
                                            <IconCash />
                                        </Center>
                                        <Overlay bg="none" opacity={1}>
                                            <Group justify="end">
                                                {Math.random() > 0.5 ? (
                                                    <RingProgress
                                                        size={25}
                                                        thickness={4}
                                                        sections={[
                                                            {
                                                                value: Math.floor(
                                                                    Math.random() *
                                                                        100
                                                                ),
                                                                color: "violet",
                                                            },
                                                        ]}
                                                    />
                                                ) : (
                                                    <Text c="violet">
                                                        <IconInfinity
                                                            size={25}
                                                        />
                                                    </Text>
                                                )}
                                            </Group>
                                        </Overlay>
                                    </Card>
                                </Grid.Col>
                            ))}
                        </Grid>
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>
            <Space h="lg" />
            <Title order={1}>Skills</Title>
            <Space h="lg" />
            <Grid>
                {skills.map((skill: Skill) => {
                    const skillLevel = getSkillLevel(
                        character.skills[skill.name]
                    );
                    skill.level = skillLevel;
                    return (
                        <Grid.Col key={skill.name} span={6}>
                            <SkillCard
                                skill={skill}
                                onInfo={() => {
                                    setSelectedSkill(skill);
                                    openSkillModal();
                                }}
                            />
                        </Grid.Col>
                    );
                })}
            </Grid>
        </Box>
    );
};
