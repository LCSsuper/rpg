import {
    Badge,
    Box,
    Card,
    Center,
    Flex,
    Group,
    Modal,
    Overlay,
    Text,
    Space,
    Button,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { ItemIcon } from "./ItemIcon";
import { Item } from "../types";

const ItemModal = ({ item, onClose }: { item: Item; onClose: () => void }) => {
    return (
        <Center>
            <Box w="30rem" maw="100vw">
                <Flex justify="space-between" pr="lg">
                    <Box flex={1}>
                        <Text c="dimmed" fs="italic">
                            {item.description}
                        </Text>
                        <Space h="lg" />
                        <Group gap="xs">
                            <Text>Affected skill: </Text>
                            <Badge tt="none">{item.affectedSkill}</Badge>
                        </Group>
                        <Space h="xs" />
                        <Group gap="xs">
                            <Text>XP modifier: </Text>
                            <Badge tt="none" color="green">
                                {item.modifier}
                            </Badge>
                        </Group>
                    </Box>
                    <Box flex={0} pt="xs">
                        <ItemIcon name={item.type} scale={2} />
                    </Box>
                </Flex>
                <Group justify="space-between" align="end">
                    <Text size="xs" fs="italic" c="dimmed">
                        You can sell this item in the shop
                    </Text>
                    <Button onClick={onClose}>Ok</Button>
                </Group>
            </Box>
        </Center>
    );
};

export const ItemCard = ({ item }: { item?: Item }) => {
    const [itemModalOpened, { open: openItemModal, close: closeItemModal }] =
        useDisclosure(false);

    if (!item) {
        return <Card withBorder h="6rem" w="6rem" />;
    }

    return (
        <>
            <Modal
                onClose={closeItemModal}
                opened={itemModalOpened}
                keepMounted={false}
                centered
                title={item.name}
                overlayProps={{
                    backgroundOpacity: 0.5,
                    blur: 3,
                }}
            >
                <ItemModal item={item} onClose={closeItemModal} />
            </Modal>
            <Card withBorder h="6rem" w="6rem" onClick={openItemModal}>
                <Center h="100%">
                    <ItemIcon name={item.type} />
                </Center>
                <Overlay bg="none" p="7">
                    <Flex justify="space-between" direction="column" h="100%">
                        <Badge tt="none" size="xs" maw="4.7rem">
                            {item.affectedSkill}
                        </Badge>
                        <Group justify="end">
                            <Badge tt="none" size="xs" color="green">
                                {item.modifier}
                            </Badge>
                        </Group>
                    </Flex>
                </Overlay>
            </Card>
        </>
    );
};
