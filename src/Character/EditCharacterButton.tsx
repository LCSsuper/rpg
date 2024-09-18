import {
    Box,
    Button,
    Center,
    Flex,
    Loader,
    Modal,
    Space,
    TextInput,
    Text,
    ActionIcon,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import {
    IconCheck,
    IconExclamationCircle,
    IconSettings,
} from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";

import { CharacterVariantSelector } from "../Components/CharacterVariantSelector";
import { Character } from "../types";
import * as api from "../api";

const EditCharacterModal = ({
    onAccept,
    onCancel,
    loading,
    character,
    setTheme,
}: {
    onAccept: (name: string, variant: string) => void;
    onCancel: () => void;
    loading: boolean;
    character: Character;
    setTheme: (color: string) => void;
}) => {
    const [name, setName] = useState<string>(character.name);
    const [variant, setVariant] = useState<string>(character.variant);

    const disabled = !name || !variant || loading;

    return (
        <Center>
            <Box w="30rem" maw="100vw">
                <Space h="lg" />
                <TextInput
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.currentTarget.value)}
                    rightSection={<Text size="xs">{`${name.length}/50`}</Text>}
                    maxLength={50}
                />
                <Space h="md" />
                <Text size="sm">Variant:</Text>
                <Space h="md" />
                <Center>
                    <CharacterVariantSelector
                        variant={variant}
                        setVariant={(v) => {
                            setVariant(v);
                            setTheme(v);
                        }}
                    />
                </Center>
                <Space h="md" />
                <Flex gap="sm">
                    <Button flex={1} onClick={onCancel} variant="light">
                        Cancel
                    </Button>
                    <Button
                        flex={1}
                        onClick={() => {
                            if (!name || !variant) return;
                            onAccept(name, variant);
                        }}
                        disabled={disabled}
                    >
                        {loading ? <Loader size="xs" /> : "Update"}
                    </Button>
                </Flex>
            </Box>
        </Center>
    );
};

export const EditCharacterButton = ({
    character,
    setTheme,
    onUpdate,
}: {
    setTheme: (color: string) => void;
    onUpdate: () => void;
    character: Character;
}) => {
    const [opened, { open, close }] = useDisclosure(false);
    const [loading, setLoading] = useState(false);

    return (
        <>
            <Modal
                opened={opened}
                onClose={close}
                keepMounted={false}
                title="Edit character"
                centered
                overlayProps={{
                    backgroundOpacity: 0.5,
                    blur: 3,
                }}
            >
                <EditCharacterModal
                    onAccept={async (name, variant) => {
                        try {
                            setLoading(true);
                            await api.updateCharacter(name, variant);
                            notifications.show({
                                message: "Character updated!",
                                color: "green",
                                icon: <IconCheck size="1.5rem" />,
                            });
                        } catch {
                            notifications.show({
                                message: "Could not update character",
                                color: "red",
                                icon: <IconExclamationCircle size="1.5rem" />,
                            });
                        } finally {
                            setLoading(false);
                            close();
                            onUpdate();
                        }
                    }}
                    onCancel={() => {
                        close();
                        setTheme(character.variant);
                    }}
                    loading={loading}
                    character={character}
                    setTheme={setTheme}
                />
            </Modal>
            <ActionIcon variant="light" onClick={open} style={{ zIndex: 2 }}>
                <IconSettings />
            </ActionIcon>
        </>
    );
};
