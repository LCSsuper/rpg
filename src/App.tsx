import {
    AppShell,
    Box,
    Center,
    MantineProvider,
    Tabs,
    createTheme,
    Text,
    Flex,
} from "@mantine/core";
import "@mantine/core/styles.layer.css";
import "@mantine/notifications/styles.css";
import { IconKarate, IconShoppingBag, IconUser } from "@tabler/icons-react";

import { CharacterPage } from "./Character";
import { Quests } from "./Quests";
import { Shop } from "./Shop";
import { Notifications } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CharacterGuard } from "./CharacterGuard";

const theme = createTheme({
    primaryColor: "violet",
});

const queryClient = new QueryClient();

// TODO @Lucas add disable rotate workaround: https://stackoverflow.com/questions/5298467/prevent-orientation-change-in-ios-safari

const App = () => {
    const colorTheme = "dark";
    return (
        <MantineProvider forceColorScheme={colorTheme} theme={theme}>
            <QueryClientProvider client={queryClient}>
                <Notifications
                    position="top-right"
                    limit={2}
                    autoClose={2000}
                    className="notifications"
                />
                <CharacterGuard>
                    <AppShell>
                        <Tabs
                            defaultValue="character"
                            inverted
                            keepMounted={false}
                            h="100vh"
                            style={{ overflowY: "scroll" }}
                            pos="relative"
                        >
                            <AppShell.Main pb="5rem">
                                <Center h={"100%"}>
                                    <Box w="30rem" maw="100vw" p="lg">
                                        <Tabs.Panel value="character">
                                            <CharacterPage
                                                colorTheme={colorTheme}
                                            />
                                        </Tabs.Panel>

                                        <Tabs.Panel value="skills">
                                            <Quests />
                                        </Tabs.Panel>

                                        <Tabs.Panel value="shop">
                                            <Shop />
                                        </Tabs.Panel>
                                    </Box>
                                </Center>
                            </AppShell.Main>
                            <AppShell.Footer>
                                <Box h="5rem">
                                    <Center>
                                        <Tabs.List grow w="25rem" maw="100vw">
                                            <Tabs.Tab value="character">
                                                <Flex
                                                    direction="column"
                                                    align="center"
                                                >
                                                    <IconUser />
                                                    <Text size="xs">
                                                        Character
                                                    </Text>
                                                </Flex>
                                            </Tabs.Tab>
                                            <Tabs.Tab value="skills">
                                                <Flex
                                                    direction="column"
                                                    align="center"
                                                >
                                                    <IconKarate />
                                                    <Text size="xs">
                                                        Quests
                                                    </Text>
                                                </Flex>
                                            </Tabs.Tab>
                                            <Tabs.Tab value="shop">
                                                <Flex
                                                    direction="column"
                                                    align="center"
                                                >
                                                    <IconShoppingBag />
                                                    <Text size="xs">Shop</Text>
                                                </Flex>
                                            </Tabs.Tab>
                                        </Tabs.List>
                                    </Center>
                                </Box>
                            </AppShell.Footer>
                        </Tabs>
                    </AppShell>
                </CharacterGuard>
            </QueryClientProvider>
        </MantineProvider>
    );
};

export default App;
