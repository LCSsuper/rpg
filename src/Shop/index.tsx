import {
    Box,
    Center,
    Space,
    Tabs,
    Title,
    Flex,
    TextInput,
    Group,
    Text,
} from "@mantine/core";
import { useState } from "react";

import { FetchedBox } from "../Components/FetchedBox";
import * as api from "../api";
import { Item } from "../types";
import { ShopItemCard } from "./ShopItemCard";
import { Dropdown } from "../Character/Dropdown";
import { skillNames } from "../constants";
import { ItemIcon } from "../Components/ItemIcon";
import { HelpButton } from "../Components/HelpButton";

const Items = ({
    gold,
    items,
    search,
    skillFilter,
    emptyText,
    onBuyOrSell,
}: {
    gold?: number;
    items: Item[];
    search: string;
    skillFilter: string;
    emptyText: string;
    onBuyOrSell: () => void;
}) => {
    const filteredItems = items.filter((item) => {
        return (
            (item.name.toLowerCase().includes(search.toLowerCase()) ||
                item.description
                    .toLowerCase()
                    .includes(search.toLowerCase())) &&
            (!skillFilter || item.affectedSkill === skillFilter)
        );
    });

    return (
        <>
            {!items.length && (
                <Center>
                    <Title order={5} pt="lg" c="dimmed">
                        {emptyText}
                    </Title>
                </Center>
            )}
            {!!items.length && !filteredItems.length && (
                <Center>
                    <Title order={5} pt="lg" c="dimmed">
                        No items in filter
                    </Title>
                </Center>
            )}
            {filteredItems.map((item) => (
                <Box pb="lg" key={item.id}>
                    <ShopItemCard
                        key={item.id}
                        item={item}
                        buyable={item.cost <= (gold || 0)}
                        onBuyOrSell={onBuyOrSell}
                    />
                </Box>
            ))}
        </>
    );
};

export const Shop = () => {
    const [search, setSearch] = useState("");
    const [skillFilter, setSkillFilter] = useState("");

    return (
        <>
            <FetchedBox<{ gold: number; items: Item[] }>
                queryKey={["getItems"]}
                queryFn={api.getItems}
                error="Could not load items"
            >
                {({ gold, items }, refresh) => {
                    const { ownedItems, shopItems } = items.reduce(
                        (acc, item) => {
                            if (item.owned) {
                                acc.ownedItems.push(item);
                            } else {
                                acc.shopItems.push(item);
                            }

                            return acc;
                        },
                        { ownedItems: [] as Item[], shopItems: [] as Item[] }
                    );

                    return (
                        <Tabs
                            keepMounted={false}
                            inverted
                            defaultValue="shop"
                            pos="relative"
                        >
                            <Box
                                pos="sticky"
                                top="0"
                                style={{ zIndex: 10 }}
                                bg="var(--mantine-color-body)"
                                pt="lg"
                                pb="lg"
                            >
                                <Box pos="relative">
                                    <Box pos="absolute" w="100%">
                                        <Group justify="end">
                                            <HelpButton />
                                        </Group>
                                    </Box>
                                    <Title size="3rem">Shop</Title>
                                    <Space h="lg" />
                                    <Box p="xs">
                                        <Space h="lg" />
                                        <Group align="center" gap="5">
                                            <Text size="xl" fw={700}>
                                                {gold}
                                            </Text>
                                            <ItemIcon name="coin" scale={1} />
                                        </Group>
                                        <Space h="lg" />
                                    </Box>
                                    <Tabs.List grow w="100%">
                                        <Tabs.Tab value="shop">
                                            Shop items
                                        </Tabs.Tab>
                                        <Tabs.Tab value="owned">
                                            Owned items
                                        </Tabs.Tab>
                                    </Tabs.List>
                                    <Space h="lg" />
                                    <Flex gap="xs">
                                        <TextInput
                                            flex={1}
                                            placeholder="Search items"
                                            value={search}
                                            onChange={(e) => {
                                                setSearch(e.target.value);
                                            }}
                                            maxLength={50}
                                        />
                                        <Dropdown
                                            onChange={(skill) => {
                                                setSkillFilter(skill);
                                            }}
                                            values={skillNames}
                                            value={skillFilter}
                                            placeholder="Filter by affected skill"
                                            allowSelectAll
                                            w="12rem"
                                        />
                                    </Flex>
                                </Box>
                            </Box>
                            <Box>
                                <Tabs.Panel value="owned">
                                    <Items
                                        search={search}
                                        skillFilter={skillFilter}
                                        items={ownedItems}
                                        emptyText="You don't have any items yet"
                                        onBuyOrSell={refresh}
                                    />
                                </Tabs.Panel>

                                <Tabs.Panel value="shop">
                                    <Items
                                        search={search}
                                        skillFilter={skillFilter}
                                        gold={gold}
                                        items={shopItems}
                                        emptyText="No more items to buy"
                                        onBuyOrSell={refresh}
                                    />
                                </Tabs.Panel>
                            </Box>
                        </Tabs>
                    );
                }}
            </FetchedBox>
        </>
    );
};
