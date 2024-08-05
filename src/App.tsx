import {
    AppShell,
    Center,
    MantineProvider,
    Tabs,
    createTheme,
} from "@mantine/core";
import "@mantine/core/styles.layer.css";
import { IconPencilPlus, IconShoppingBag, IconUser } from "@tabler/icons-react";

import { Character } from "./Character";

const theme = createTheme({
    primaryColor: "violet",
});

const App = () => {
    return (
        <MantineProvider forceColorScheme={"dark"} theme={theme}>
            <AppShell padding="md">
                <Tabs defaultValue="character">
                    <AppShell.Main>
                        <Center h={"100%"}>
                            <Tabs.Panel value="character">
                                <Character />
                            </Tabs.Panel>

                            <Tabs.Panel value="skills">
                                skills tab content
                            </Tabs.Panel>

                            <Tabs.Panel value="shop">
                                shop tab content
                            </Tabs.Panel>
                        </Center>
                    </AppShell.Main>
                    <AppShell.Footer>
                        <Center>
                            <Tabs.List>
                                <Tabs.Tab value="character">
                                    <IconUser />
                                </Tabs.Tab>
                                <Tabs.Tab value="skills">
                                    <IconPencilPlus />
                                </Tabs.Tab>
                                <Tabs.Tab value="shop">
                                    <IconShoppingBag />
                                </Tabs.Tab>
                            </Tabs.List>
                        </Center>
                    </AppShell.Footer>
                </Tabs>
            </AppShell>
        </MantineProvider>
    );
};

export default App;
