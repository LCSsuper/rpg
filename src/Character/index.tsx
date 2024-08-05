import { Box, Group, Progress, Space, Title } from "@mantine/core";

type Skill = {
    id: string;
    name: string;
    xp: number;
    level: number;
};

export const Character = () => {
    const skills: Skill[] = [
        { id: "1", name: "Wisdom", xp: 23, level: 3 },
        { id: "2", name: "Strength", xp: 55, level: 3 },
        { id: "3", name: "Endurance", xp: 3, level: 3 },
        { id: "4", name: "Craftsmanship", xp: 87, level: 3 },
    ];

    return (
        <Box w="30rem" maw="100vw" p="sm">
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
                <Title order={1} size="3rem">
                    Level 1
                </Title>
                <Title order={2} c="dimmed" pb="xs">
                    Beginner
                </Title>
            </Group>
            <Progress value={50} size="xl" />
            <Space h="lg" />
            <Space h="lg" />
            <Title order={1}>Skills</Title>
            <Space h="md" />
            {skills.map((skill) => (
                <Box key={skill.id}>
                    <Group justify="space-between">
                        <Title order={3}>{skill.name}</Title>
                        <Title order={5} c="dimmed">
                            Level {skill.level}
                        </Title>
                    </Group>
                    <Progress value={skill.xp} size="lg" color="cyan" />
                    <Space h="xl" />
                </Box>
            ))}
        </Box>
    );
};
