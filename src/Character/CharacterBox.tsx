import { useState } from "react";
import { Box, Grid, Group, Modal, Progress, Space, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { skills } from "../constants";
import { Character, Skill } from "../types";
import { SkillCard } from "../Components/SkillCard";
import { getMainLevel, getSkillLevel } from "../utils";
import { SkillModal } from "./SkillModal";

export const CharacterBox = ({ character }: { character: Character }) => {
    const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
    const [skillModalOpened, { open: openSkillModal, close: closeSkillModal }] =
        useDisclosure(false);

    const mainLevel = getMainLevel(character.xp);

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
                        {mainLevel.level}
                    </Title>
                </Group>
                <Title order={4} c="dimmed" pb="xs">
                    {mainLevel.title}
                </Title>
            </Group>
            <Progress value={mainLevel.progress} size="xl" />
            <Space h="lg" />
            <Space h="lg" />
            <Title order={1}>Skills</Title>
            <Space h="md" />
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
