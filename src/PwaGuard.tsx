import {
    Box,
    Button,
    Card,
    Center,
    Divider,
    Space,
    Title,
    Image,
    Text,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconDownload } from "@tabler/icons-react";
import { ReactNode, useEffect, useState } from "react";

export const PwaGuard = ({ children }: { children: ReactNode }) => {
    const [installPrompt, setInstallPrompt] = useState<
        Event & {
            prompt?: () => void;
            userChoice?: Promise<{
                outcome: "accepted" | "rejected";
            }>;
        }
    >();
    const isPwa = useMediaQuery("(display-mode: standalone)");
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isAndroid = /Android/.test(navigator.userAgent);

    useEffect(() => {
        window.addEventListener("beforeinstallprompt", (e) => {
            setInstallPrompt(e);
        });
        window.addEventListener("appinstalled", () => {
            console.log("RPG is installed");
        });
    }, []);

    if (!installPrompt && isPwa) return <>{children}</>;

    return (
        <Center>
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
                <Title order={3}>
                    {!!installPrompt
                        ? "Download the app to start your journey!"
                        : "Open the app to continue your journey!"}
                </Title>
                <Space h="lg" />
                {!!installPrompt && (
                    <Center>
                        <Button
                            variant="contained"
                            onClick={() => {
                                if (!installPrompt) return;
                                installPrompt.prompt?.();
                                installPrompt.userChoice?.then(
                                    ({ outcome }) => {
                                        if (outcome !== "accepted") return;
                                        setInstallPrompt(undefined);
                                    }
                                );
                            }}
                            leftSection={<IconDownload />}
                        >
                            Download app
                        </Button>
                    </Center>
                )}
                {(isIOS || isAndroid) && (
                    <Title order={4}>Not installed yet?</Title>
                )}
                {isIOS && (
                    <Text c="dimmed" size="sm">
                        Press the share button and select "Add to Home Screen"
                    </Text>
                )}
                {isAndroid && (
                    <Text c="dimmed" size="sm">
                        Press the three dots button and select "Add to Home
                        Screen"
                    </Text>
                )}
            </Box>
        </Center>
    );
};
