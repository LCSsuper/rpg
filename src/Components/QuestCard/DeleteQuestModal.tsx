import { Center, Box, Space, Flex, Button, Text, Loader } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconExclamationCircle } from "@tabler/icons-react";
import { useState } from "react";

import { Quest } from "../../types";
import * as api from "../../api";

export const DeleteQuestModal = ({
    quest,
    closeRemove,
    onChange,
}: {
    quest: Quest;
    closeRemove: () => void;
    onChange?: () => void;
}) => {
    const [loading, setLoading] = useState(false);

    return (
        <Center>
            <Box w="30rem" maw="100vw">
                <Text size="lg">Are you sure you want to delete quest:</Text>
                <Text fs="italic">{quest.title}</Text>
                <Space h="lg" />
                <Flex gap="sm">
                    <Button flex={1} onClick={closeRemove} variant="light">
                        Cancel
                    </Button>
                    <Button
                        flex={1}
                        disabled={loading}
                        onClick={async () => {
                            try {
                                setLoading(true);
                                await api.deleteQuest(quest.id);
                                notifications.show({
                                    message: "Quest deleted!",
                                    color: "green",
                                    icon: <IconCheck size="1.5rem" />,
                                });
                            } catch {
                                notifications.show({
                                    message: "Could not delete quest",
                                    color: "red",
                                    icon: (
                                        <IconExclamationCircle size="1.5rem" />
                                    ),
                                });
                            } finally {
                                setLoading(false);
                                closeRemove();
                                if (onChange) onChange();
                            }
                        }}
                    >
                        {loading ? <Loader size="xs" /> : "Delete Quest"}
                    </Button>
                </Flex>
            </Box>
        </Center>
    );
};
