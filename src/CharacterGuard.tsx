import {
    Box,
    Center,
    Divider,
    Space,
    Title,
    Text,
    TextInput,
    Card,
    Image,
    Button,
    Group,
    Grid,
    Overlay,
    Loader,
    Tabs,
} from "@mantine/core";
import { ReactNode, useState } from "react";

import * as api from "./api";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconExclamationCircle } from "@tabler/icons-react";

const characterOptions = [
    "./character-option-1.webp",
    "./character-option-2.png",
    "./character-option-3.png",
];

const Signup = ({
    existingToken,
    onSignup,
}: {
    existingToken: string | null;
    onSignup: () => void;
}) => {
    const [name, setName] = useState("");
    const [selectedCharacter, setSelectedCharacter] = useState(
        characterOptions[0]
    );
    const [token, setToken] = useState(existingToken || "");
    const [loading, setLoading] = useState(false);

    const disabled = !name || !token || loading;

    const createCharacter = async () => {
        try {
            setLoading(true);
            const { characterId } = await api.createCharacter(token, name);
            localStorage.setItem("characterId", characterId);
            localStorage.setItem("token", token);
            notifications.show({
                message: "Character created!",
                color: "green",
                icon: <IconCheck size="1.5rem" />,
            });
            onSignup();
        } catch (error) {
            const message =
                (error as any).response?.body?.message === "Unauthorized"
                    ? "Invalid token"
                    : "Could not create character";

            notifications.show({
                message,
                color: "red",
                icon: <IconExclamationCircle size="1.5rem" />,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Text size="xl">Create your character:</Text>
            <Space h="lg" />
            <Center>
                <Grid w="20rem" gutter="md" style={{ position: "relative" }}>
                    {characterOptions.map((src) => {
                        const selected = selectedCharacter === src;

                        return (
                            <Grid.Col span={4} key={src}>
                                <Card
                                    onClick={() => setSelectedCharacter(src)}
                                    shadow="xs"
                                    padding="0"
                                    withBorder
                                    p="xs"
                                    bg={
                                        selected
                                            ? "var(--mantine-color-violet-light)"
                                            : undefined
                                    }
                                    styles={(theme) => ({
                                        root: {
                                            borderColor: selected
                                                ? theme.colors.violet[7]
                                                : undefined,
                                        },
                                    })}
                                >
                                    <Image src={src} w="4.5rem" />
                                </Card>
                            </Grid.Col>
                        );
                    })}
                    {/* <Overlay bg="none" blur={3}>
                        <Center h="100%">
                            <Title order={3} c="dimmed">
                                coming soon
                            </Title>
                        </Center>
                    </Overlay> */}
                </Grid>
            </Center>
            <Space h="lg" />
            <TextInput
                label="Character name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={20}
            />
            <Space h="xs" />
            <TextInput
                label="token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
            />
            <Space h="lg" />
            <Group justify="end">
                <Button disabled={disabled} onClick={createCharacter} w="6rem">
                    {loading ? <Loader size="xs" /> : "Create"}
                </Button>
            </Group>
        </>
    );
};

const Signin = ({
    existingToken,
    onSignin,
}: {
    existingToken: string | null;
    onSignin: () => void;
}) => {
    const [characterId, setCharacterId] = useState("");
    const [token, setToken] = useState(existingToken || "");
    const [loading, setLoading] = useState(false);

    const disabled = !characterId || !token || loading;

    const signin = async () => {
        try {
            setLoading(true);
            await api.characterExists(characterId, token);
            localStorage.setItem("characterId", characterId);
            localStorage.setItem("token", token);
            notifications.show({
                message: "Signed in!",
                color: "green",
                icon: <IconCheck size="1.5rem" />,
            });
            onSignin();
        } catch (error) {
            const message =
                (error as any).response?.body?.message === "Unauthorized"
                    ? "Invalid token"
                    : "Character does not exist";

            notifications.show({
                message,
                color: "red",
                icon: <IconExclamationCircle size="1.5rem" />,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <TextInput
                label="Character ID"
                value={characterId}
                onChange={(e) => setCharacterId(e.target.value)}
            />
            <Space h="xs" />
            <TextInput
                label="token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
            />
            <Space h="lg" />
            <Group justify="end">
                <Button disabled={disabled} onClick={signin} w="6rem">
                    {loading ? <Loader size="xs" /> : "Sign in"}
                </Button>
            </Group>
        </>
    );
};

export const CharacterGuard = ({ children }: { children: ReactNode }) => {
    const existingCharacterId = localStorage.getItem("characterId");
    const existingToken = localStorage.getItem("token");

    const [randomId, forceUpdate] = useState(0);

    if (!existingCharacterId || !existingToken) {
        return (
            <Center key={randomId}>
                <Box w="30rem" maw="100vw" p="lg">
                    <Space h="lg" />
                    <Space h="lg" />
                    <Space h="lg" />
                    <Center>
                        <Card shadow="xs" padding="0" withBorder>
                            <Image src="./logo192.png" w="128" />
                        </Card>
                    </Center>
                    <Space h="lg" />
                    <Center>
                        <Title order={1}>Real Life RPG</Title>
                    </Center>
                    <Center>
                        <Text c="dimmed" fs="italic" size="xl">
                            Become a master at life
                        </Text>
                    </Center>
                    <Space h="lg" />
                    <Divider />
                    <Space h="lg" />
                    <Tabs defaultValue="signup">
                        <Tabs.List grow>
                            <Tabs.Tab value="signup">Sign up</Tabs.Tab>
                            <Tabs.Tab value="signin">Sign in</Tabs.Tab>
                        </Tabs.List>

                        <Space h="md" />

                        <Tabs.Panel value="signup">
                            <Signup
                                existingToken={existingToken}
                                onSignup={() => forceUpdate(Math.random())}
                            />
                        </Tabs.Panel>
                        <Tabs.Panel value="signin">
                            <Signin
                                existingToken={existingToken}
                                onSignin={() => forceUpdate(Math.random())}
                            />
                        </Tabs.Panel>
                    </Tabs>
                </Box>
            </Center>
        );
    }

    return <>{children}</>;
};
