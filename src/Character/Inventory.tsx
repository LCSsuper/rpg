import { Title, Grid, Space, Group, Text, Box, Center } from "@mantine/core";
import { Inventory } from "../types";
import { ItemIcon } from "../Components/ItemIcon";
import { ItemCard } from "../Components/ItemCard";

const getNextNumberDivisibleBy = (number: number, divisor: number) => {
    return number + (divisor - (number % divisor)) || 4;
};

export const InventoryBox = ({ inventory }: { inventory: Inventory }) => {
    return (
        <Box>
            <Box p="xs">
                <Space h="lg" />
                <Group align="center" gap="5">
                    <Text size="xl" fw={700}>
                        {inventory.gold}
                    </Text>
                    <ItemIcon name="coin" scale={1} />
                </Group>
                <Space h="lg" />
            </Box>
            <Box p="xs" pos="relative">
                <Title order={3}>Items</Title>
                <Grid>
                    {Array.from({
                        length: getNextNumberDivisibleBy(
                            inventory.items.length,
                            4
                        ),
                    }).map((_, index) => {
                        const item = inventory.items[index];

                        return (
                            <Grid.Col span={3} key={index}>
                                <Center>
                                    <ItemCard item={item} />
                                </Center>
                            </Grid.Col>
                        );
                    })}
                </Grid>
                <Space h="lg" />
            </Box>
        </Box>
    );
};
