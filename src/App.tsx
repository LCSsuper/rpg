import {
    AppShell,
    Box,
    Center,
    MantineProvider,
    Tabs,
    createTheme,
} from "@mantine/core";
import "@mantine/core/styles.layer.css";
import { IconKarate, IconShoppingBag, IconUser } from "@tabler/icons-react";

import { Character } from "./Character";
import { Quests } from "./Quests";
import { Shop } from "./Shop";

const theme = createTheme({
    primaryColor: "violet",
});

const App = () => {
    return (
        <MantineProvider forceColorScheme={"dark"} theme={theme}>
            <AppShell>
                <Tabs defaultValue="character" inverted keepMounted={false}>
                    <AppShell.Main pb="5rem">
                        <Center h={"100%"}>
                            <Box w="30rem" maw="100vw" p="lg">
                                <Tabs.Panel value="character">
                                    <Character />
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
                                        <IconUser />
                                    </Tabs.Tab>
                                    <Tabs.Tab value="skills">
                                        <IconKarate />
                                    </Tabs.Tab>
                                    <Tabs.Tab value="shop">
                                        <IconShoppingBag />
                                    </Tabs.Tab>
                                </Tabs.List>
                            </Center>
                        </Box>
                    </AppShell.Footer>
                </Tabs>
            </AppShell>
        </MantineProvider>
    );
};

export default App;
