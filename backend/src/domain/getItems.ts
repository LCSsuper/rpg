import { Item } from "../types";
import { items } from "./constants/items";
import { getInventory } from "./getInventory";

export const getItems = async (
    characterId: string
): Promise<{ gold: number; items: Item[] }> => {
    const inventory = await getInventory(characterId);

    const ownedItemIds = new Set(inventory.items.map((item) => item.id));

    return {
        gold: inventory.gold,
        items: items.map((item) => ({
            ...item,
            owned: ownedItemIds.has(item.id),
        })),
    };
};
