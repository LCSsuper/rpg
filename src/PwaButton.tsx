import { Button, Text, Modal, Title, Affix, Box, Center } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { IconDownload } from "@tabler/icons-react";
import { useEffect, useState } from "react";

export const PwaButton = () => {
    const [opened, { open, close }] = useDisclosure(false);
    const [installPrompt, setInstallPrompt] = useState<
        Event & {
            prompt?: () => void;
            userChoice?: Promise<{
                outcome: "accepted" | "rejected";
            }>;
        }
    >();

    useEffect(() => {
        window.addEventListener("beforeinstallprompt", (e) => {
            setInstallPrompt(e);
        });
    }, []);

    const isPwa = useMediaQuery("(display-mode: standalone)");
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isAndroid = /Android/.test(navigator.userAgent);
    const isLoggedIn = !!localStorage.getItem("characterId");

    if (isPwa) return null;

    return (
        <>
            <Modal
                opened={opened}
                onClose={close}
                keepMounted={false}
                centered
                title="Install app"
                overlayProps={{
                    backgroundOpacity: 0.5,
                    blur: 3,
                }}
            >
                <Box>
                    {!!installPrompt ? (
                        <Center h="5rem">
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
                                Install now
                            </Button>
                        </Center>
                    ) : (
                        <>
                            <Title order={4}>How to install</Title>
                            {isIOS && (
                                <Text c="dimmed" size="sm">
                                    Press the share button and select "Add to
                                    Home Screen"
                                </Text>
                            )}
                            {isAndroid && (
                                <Text c="dimmed" size="sm">
                                    Press the three dots button and select "Add
                                    to Home Screen"
                                </Text>
                            )}
                            {!isIOS && !isAndroid && (
                                <Text c="dimmed" size="sm">
                                    Press the download button in the address bar
                                    (Chrome)
                                </Text>
                            )}
                        </>
                    )}
                </Box>
            </Modal>
            <Affix
                bottom={isLoggedIn ? "6rem" : "1rem"}
                right="1rem"
                zIndex={1}
            >
                <Button onClick={open} leftSection={<IconDownload />}>
                    Install app
                </Button>
            </Affix>
        </>
    );
};
