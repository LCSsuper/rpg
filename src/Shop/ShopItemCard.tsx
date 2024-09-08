import {
    Badge,
    Box,
    Button,
    Card,
    Flex,
    Group,
    Loader,
    Space,
    Text,
} from "@mantine/core";
import { IconCheck, IconExclamationCircle } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { useState } from "react";

import { ItemIcon } from "../Components/ItemIcon";
import { Item } from "../types";
import * as api from "../api";

export const ShopItemCard = ({
    item,
    buyable,
    onBuyOrSell,
}: {
    item: Item;
    buyable: boolean;
    onBuyOrSell: () => void;
}) => {
    const [loading, setLoading] = useState(false);

    const buyOrSellItem = async () => {
        try {
            setLoading(true);

            if (item.owned) await api.sellItem(item.id);
            if (!item.owned) await api.buyItem(item.id);
            notifications.show({
                message: item.owned ? "Item sold!" : "Item bought!",
                color: "green",
                icon: <IconCheck size="1.5rem" />,
            });
            onBuyOrSell();
        } catch {
            notifications.show({
                message: `Could not ${item.owned ? "sell" : "buy"} item`,
                color: "red",
                icon: <IconExclamationCircle size="1.5rem" />,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card withBorder p="xs">
            <Flex>
                <Box flex={0} pr="xs">
                    <ItemIcon name={item.type} />
                </Box>
                <Box flex={1}>
                    <Text fw="bold" size="sm">
                        {item.name}
                    </Text>
                    <Text c="dimmed" size="xs" fs="italic">
                        {item.description}
                    </Text>
                </Box>
                <Box flex="0 0 4.5rem">
                    <Group gap="0" justify="end">
                        <Text size="xs" fw="bold">
                            {item.owned ? item.worth : item.cost}
                        </Text>
                        <ItemIcon name="coin" scale={0.7} />
                    </Group>
                </Box>
            </Flex>
            <Space h="lg" />
            <Group justify="space-between" align="end">
                <Box>
                    <Group gap="5">
                        <Text size="xs">Affected skill: </Text>
                        <Badge tt="none" size="xs">
                            {item.affectedSkill}
                        </Badge>
                    </Group>
                    <Space h="xs" />
                    <Group gap="5">
                        <Text size="xs">XP modifier: </Text>
                        <Badge tt="none" size="xs" color="green">
                            {item.modifier}
                        </Badge>
                    </Group>
                </Box>
                <Group>
                    {!buyable && !item.owned && (
                        <Text size="xs" fs="italic" c="dimmed">
                            Too expensive
                        </Text>
                    )}
                    {item.owned && (
                        <Button
                            variant="light"
                            color="red"
                            disabled={loading}
                            onClick={buyOrSellItem}
                        >
                            {loading ? <Loader size="xs" /> : "Sell"}
                        </Button>
                    )}
                    {!item.owned && (
                        <Button
                            variant="light"
                            color="green"
                            disabled={!buyable || loading}
                            onClick={buyOrSellItem}
                        >
                            {loading ? <Loader size="xs" /> : "Buy"}
                        </Button>
                    )}
                </Group>
            </Group>
        </Card>
    );
};
