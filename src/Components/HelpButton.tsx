import {
    ActionIcon,
    Box,
    Center,
    Modal,
    Space,
    Title,
    Text,
    Divider,
    Tabs,
    Group,
    Flex,
    Button,
    Textarea,
    Overlay,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import {
    IconCheck,
    IconCopy,
    IconExclamationCircle,
    IconHelpCircle,
} from "@tabler/icons-react";
import { useState } from "react";

import * as api from "../api";

const HowToPlay = () => (
    <>
        <Title order={4}>How to play:</Title>
        <Divider />
        <Space h="md" />
        <Text>1. Create quests for habits in your life</Text>
        <Text fs="italic" c="dimmed" pb="xs">
            Try to make them challenging but achievable
            <br /> Make sure the quests are specific and measurable
            <br /> Make the quests and their reward balanced
            <br /> For example:
            <br /> - Do 100 pushups - 1 XP
            <br /> - Drink a glass of water - 0.1 XP
        </Text>
        <Text pb="xs">2. Gather XP by completing these quests</Text>
        <Text>3. Level up by gathering enough XP</Text>
        <Text fs="italic" c="dimmed" pb="xs">
            Leveling up is rewarded with money and sometimes items
        </Text>
        <Text pb="xs">4. Buy items in the shop to boost XP</Text>
        <Space h="lg" />
        <Title order={4}>How to win:</Title>
        <Divider />
        <Space h="md" />
        <Text>
            There is no winning in this game. Just have fun and see how far you
            can get! Good luck!
        </Text>
    </>
);

const Support = () => {
    const [loading, setLoading] = useState(false);
    const [feedback, setFeedback] = useState("");
    const [feedbackSent, setFeedbackSent] = useState(false);

    const sendFeedback = async () => {
        try {
            setLoading(true);

            await api.sendFeedback(feedback);
            notifications.show({
                message: "Feedback sent!",
                color: "green",
                icon: <IconCheck size="1.5rem" />,
            });
            setFeedbackSent(true);
        } catch {
            notifications.show({
                message: `Could not send feedback`,
                color: "red",
                icon: <IconExclamationCircle size="1.5rem" />,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Box pos="relative">
                <Textarea
                    rows={5}
                    maxRows={5}
                    maxLength={500}
                    placeholder="Your feedback..."
                    label="Any thoughts about the app? Send some feedback!"
                    value={feedback}
                    onChange={(e) => setFeedback(e.currentTarget.value)}
                    disabled={loading || feedbackSent}
                />
                <Space h="xs" />
                <Group justify="space-between" align="start">
                    <Text size="xs" c="dimmed">
                        {`${feedback.length}/500`}
                    </Text>
                    <Button
                        w="5rem"
                        disabled={loading || !feedback.length || feedbackSent}
                        onClick={sendFeedback}
                    >
                        Send
                    </Button>
                </Group>
                {feedbackSent && (
                    <Overlay bg="none" blur={3}>
                        <Center h="100%">
                            <Text c="gray">
                                Thank you for sending feedback!
                            </Text>
                        </Center>
                    </Overlay>
                )}
            </Box>
            <Space h="lg" />
            <Text>
                You can also support me by buying me a coffee at{" "}
                <a href="https://www.buymeacoffee.com/lcssuper">
                    buymeacoffee.com/lcssuper
                </a>
            </Text>
        </>
    );
};

const CharacterOptions = () => {
    const characterId = localStorage.getItem("characterId");

    const copyToClipboard = () => {
        navigator.clipboard.writeText(characterId || "");
        notifications.show({
            message: "Character ID copied to clipboard",
        });
    };

    return (
        <>
            <Title order={4}>Character ID:</Title>
            <Group>
                <Text>{characterId}</Text>
                <ActionIcon size="sm" variant="light" onClick={copyToClipboard}>
                    <IconCopy />
                </ActionIcon>
            </Group>
            <Text fs="italic" c="dimmed">
                Save this ID somewhere before logging out
            </Text>
            <Space h="lg" />
            <Flex gap="xs">
                <Button
                    flex={1}
                    variant="light"
                    color="red"
                    onClick={() => {
                        localStorage.removeItem("characterId");
                        window.location.reload();
                    }}
                    disabled
                >
                    Delete character
                </Button>
                <Button
                    flex={1}
                    variant="light"
                    onClick={() => {
                        localStorage.removeItem("characterId");
                        window.location.reload();
                    }}
                >
                    Logout
                </Button>
            </Flex>
        </>
    );
};

export const HelpModal = () => {
    return (
        <Center>
            <Box w="30rem" maw="100vw">
                <Title size="3rem">Need help?</Title>
                <Space h="lg" />
                <Tabs defaultValue="htp">
                    <Tabs.List grow>
                        <Tabs.Tab value="htp">How to play</Tabs.Tab>
                        <Tabs.Tab value="support">Support</Tabs.Tab>
                        <Tabs.Tab value="options">Character options</Tabs.Tab>
                    </Tabs.List>

                    <Space h="md" />

                    <Tabs.Panel value="htp">
                        <HowToPlay />
                    </Tabs.Panel>
                    <Tabs.Panel value="support">
                        <Support />
                    </Tabs.Panel>
                    <Tabs.Panel value="options">
                        <CharacterOptions />
                    </Tabs.Panel>
                </Tabs>
            </Box>
        </Center>
    );
};

export const HelpButton = () => {
    const [infoOpened, { open: openInfo, close: closeInfo }] =
        useDisclosure(false);

    return (
        <>
            <Modal
                opened={infoOpened}
                onClose={closeInfo}
                keepMounted={false}
                fullScreen
            >
                <HelpModal />
            </Modal>
            <ActionIcon onClick={openInfo} variant="light">
                <IconHelpCircle />
            </ActionIcon>
        </>
    );
};
