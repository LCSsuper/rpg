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
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconCopy, IconHelpCircle } from "@tabler/icons-react";

const HowToPlay = () => (
    <>
        <Title order={4}>How to play:</Title>
        <Divider />
        <Space h="md" />
        <Text>1. Create quests for habits in your life</Text>
        <Text fs="italic" c="dimmed" pb="xs">
            For example: Do 100 pushups
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

const Support = () => (
    <>
        {/* <Text>
            If you have any questions or feedback, please contact me at{" "}
            <a href="mailto:lcssuper@gmail.com">lcssuper@gmail.com</a>
        </Text> */}
        <Text>
            You can support me by buying me a coffee at{" "}
            <a href="https://www.buymeacoffee.com/lcssuper">
                buymeacoffee.com/lcssuper
            </a>
        </Text>
    </>
);

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
