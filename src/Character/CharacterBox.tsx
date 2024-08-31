import { useEffect, useState } from "react";
import {
    Box,
    Grid,
    Group,
    Modal,
    Progress,
    Space,
    Title,
    Tabs,
    Indicator,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { skills } from "../constants";
import { Character, Skill } from "../types";
import { SkillCard } from "../Components/SkillCard";
import { getMainLevel, getSkillLevel } from "../utils";
import { SkillModal } from "./SkillModal";
import { InventoryBox } from "./Inventory";

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
    const [leveledUp, setLeveledUp] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState<"skills" | "inventory">(
        "skills"
    );
    const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
    const [skillModalOpened, { open: openSkillModal, close: closeSkillModal }] =
        useDisclosure(false);

    useEffect(() => {
        const didLevelUp = window.localStorage.getItem("levelUp");
        if (didLevelUp === "true") {
            setLeveledUp(true);
        }
    }, []);

    useEffect(() => {
        if (activeTab === "inventory") {
            window.localStorage.setItem("levelUp", "false");
            setLeveledUp(false);
        }
    }, [activeTab]);

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
            <Box pos="fixed">
                <Group gap="xs">
                    <Title order={2} c="violet">
                        {character.name}
                    </Title>
                </Group>
            </Box>
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
            <Tabs
                keepMounted={false}
                inverted
                value={activeTab}
                onChange={(tab) => {
                    if (!tab) return;
                    setActiveTab(tab as "skills" | "inventory");
                }}
            >
                <Tabs.List grow w="100%">
                    <Tabs.Tab value="skills">Skills</Tabs.Tab>
                    <Tabs.Tab value="inventory">
                        {leveledUp ? (
                            <Indicator color="red">Inventory</Indicator>
                        ) : (
                            "Inventory"
                        )}
                    </Tabs.Tab>
                </Tabs.List>
                <Space h="lg" />

                <Tabs.Panel value="inventory">
                    <InventoryBox inventory={character.inventory} />
                </Tabs.Panel>

                <Tabs.Panel value="skills">
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
                </Tabs.Panel>
            </Tabs>
        </Box>
    );
};
