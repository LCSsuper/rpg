import {
    Modal,
    Box,
    Title,
    Text,
    Divider,
    Space,
    ScrollArea,
    Affix,
    ActionIcon,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCalendar } from "@tabler/icons-react";

const currentVersion = "0.8";

const Update = ({
    version,
    children,
    current,
}: {
    version: string;
    children: any;
    current?: boolean;
}) => (
    <>
        {!current && <Space h="xl" />}
        <Title order={current ? 3 : 4}>{version} released!</Title>
        <Text>{children}</Text>
    </>
);

export const UpdateLog = () => {
    const latestUpdateShown = window.localStorage.getItem("latestUpdateShown");

    const [opened, { open, close }] = useDisclosure(
        latestUpdateShown !== currentVersion
    );

    const handleDismiss = () => {
        window.localStorage.setItem("latestUpdateShown", currentVersion);
        close();
    };

    return (
        <>
            <Modal
                opened={opened}
                onClose={handleDismiss}
                keepMounted={false}
                centered
                title="Update log"
                overlayProps={{
                    backgroundOpacity: 0.5,
                    blur: 3,
                }}
            >
                <Box>
                    <Update current version="v0.8">
                        Implemented quest streaks (idea by Barto)
                        <br />
                        Improved item pricing (idea by Carlijn)
                    </Update>
                    <Space h="xl" />
                    <Title order={5}>previous releases</Title>
                    <Divider />
                    <ScrollArea h="15rem" type="scroll">
                        <Update version="v0.7">New character options</Update>
                        <Update version="v0.6">
                            Quests can now be completed in the skill detail page
                        </Update>
                        <Update version="v0.5">
                            Info about how to install the app
                        </Update>
                        <Update version="v0.4">
                            Show last quest completion <br />
                            Implemented quest cooldown
                        </Update>
                        <Update version="v0.3">
                            Added feedback functionality <br />
                            Rewarded items are now for skills with little to no
                            XP
                        </Update>
                        <Update version="v0.2">
                            Added Help button/popup <br />
                            Implemented logout and login <br />
                            Implemented item modifiers
                        </Update>
                        <Update version="v0.1">
                            Initial version with character, quests and shop.
                        </Update>
                    </ScrollArea>
                </Box>
            </Modal>
            <ActionIcon onClick={open} variant="light">
                <IconCalendar />
            </ActionIcon>
        </>
    );
};
