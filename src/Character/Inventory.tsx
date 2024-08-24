import {
    Title,
    Grid,
    Card,
    Center,
    Space,
    Overlay,
    Group,
    RingProgress,
    Text,
    Box,
} from "@mantine/core";
import {
    IconSword,
    IconCash,
    IconInfinity,
    IconCoin,
} from "@tabler/icons-react";
import { Inventory } from "../types";

export const InventoryBox = ({ inventory }: { inventory: Inventory }) => {
    return (
        <Box>
            <Box p="xs">
                <Space h="lg" />
                <Group align="center" gap="5">
                    <Text size="md" fw={700}>
                        {inventory.gold}
                    </Text>
                    <IconCoin color="var(--mantine-color-yellow-filled)" />
                </Group>
                <Space h="lg" />
            </Box>
            <Box p="xs" pos="relative">
                <Title order={3}>Items</Title>
                <Grid>
                    {Array.from({ length: 8 }).map((_, index) => (
                        <Grid.Col span={3} key={index}>
                            <Card withBorder h="4.5rem">
                                <Center h="100%">
                                    {index < 3 && <IconSword />}
                                </Center>
                            </Card>
                        </Grid.Col>
                    ))}
                </Grid>
                <Space h="lg" />
                <Title order={3}>Active items</Title>
                <Grid>
                    {Array.from({ length: 4 }).map((_, index) => (
                        <Grid.Col span={3} key={index}>
                            <Card withBorder h="4.5rem">
                                <Center h="100%">
                                    <IconCash />
                                </Center>
                                <Overlay bg="none" opacity={1}>
                                    <Group justify="end">
                                        {Math.random() > 0.5 ? (
                                            <RingProgress
                                                size={25}
                                                thickness={4}
                                                sections={[
                                                    {
                                                        value: Math.floor(
                                                            Math.random() * 100
                                                        ),
                                                        color: "violet",
                                                    },
                                                ]}
                                            />
                                        ) : (
                                            <Text c="violet">
                                                <IconInfinity size={25} />
                                            </Text>
                                        )}
                                    </Group>
                                </Overlay>
                            </Card>
                        </Grid.Col>
                    ))}
                </Grid>
                <Overlay bg="none" blur={3}>
                    <Center h="100%">
                        <Title order={3} c="dimmed">
                            coming soon...
                        </Title>
                    </Center>
                </Overlay>
            </Box>
        </Box>
    );
};
