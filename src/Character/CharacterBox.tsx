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
    Center,
    Image,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { skills } from "../constants";
import { Character, Skill } from "../types";
import { SkillCard } from "../Components/SkillCard";
import { getCharacterImageSrc, getMainLevel, getSkillLevel } from "../utils";
import { SkillModal } from "./SkillModal";
import { InventoryBox } from "./Inventory";
import { HelpButton } from "../Components/HelpButton";

export const CharacterBox = ({
    character,
    refetch,
}: {
    character: Character;
    refetch: () => void;
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
    const color = "var(--mantine-color-body)";
    const characterImage = getCharacterImageSrc(
        character.variant,
        mainLevel.level
    );

    return (
        <Box>
            <Tabs
                keepMounted={false}
                inverted
                value={activeTab}
                onChange={(tab) => {
                    if (!tab) return;
                    setActiveTab(tab as "skills" | "inventory");
                }}
            >
                <Modal
                    opened={skillModalOpened}
                    onClose={closeSkillModal}
                    fullScreen
                    keepMounted={false}
                >
                    <SkillModal
                        skill={selectedSkill}
                        onCompleteQuest={refetch}
                    />
                </Modal>
                <Box
                    pos="sticky"
                    w="100%"
                    top="0"
                    pt="lg"
                    h="19rem"
                    bg="var(--mantine-color-body)"
                    style={{ zIndex: 2 }}
                >
                    <Group justify="space-between">
                        <Title order={2} c="var(--mantine-primary-color-3)">
                            {character.name}
                        </Title>
                        <HelpButton />
                    </Group>
                    <div
                        style={{
                            position: "absolute",
                            height: "16rem",
                            width: "100%",
                            top: 0,
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
                            }}
                        >
                            <Center>
                                <Image
                                    src={characterImage}
                                    alt="Character"
                                    style={{ height: "19rem" }}
                                />
                            </Center>
                        </div>
                    </div>
                </Box>
                <Box
                    bg="var(--mantine-color-body)"
                    pos="sticky"
                    top="12rem"
                    style={{ zIndex: 3 }}
                >
                    <div
                        style={{
                            position: "absolute",
                            left: 0,
                            top: "-3rem",
                            right: 0,
                            height: "3rem",
                            background: `linear-gradient(-180deg, rgba(0, 0, 0, 0) 0%, ${color} 70%, ${color} 100%)`,
                            zIndex: 1,
                        }}
                    />
                    <Group align="end" pos="absolute" top="-3.5rem">
                        <Group gap="xs" align="end">
                            <Title order={2} pb="xs" style={{ zIndex: 10 }}>
                                Level
                            </Title>
                            <Title order={1} size="3rem" style={{ zIndex: 10 }}>
                                {mainLevel.level}
                            </Title>
                        </Group>
                        <Title
                            order={4}
                            c="dimmed"
                            pb="xs"
                            style={{ zIndex: 10 }}
                        >
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
                    <Space h="lg" />
                </Box>
                <Box bg="var(--mantine-color-body)">
                    <Tabs.Panel value="inventory">
                        <InventoryBox inventory={character.inventory} />
                    </Tabs.Panel>

                    <Tabs.Panel value="skills">
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
                </Box>
            </Tabs>
        </Box>
    );
};
