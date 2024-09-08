import { Item } from "../types";
import { getMainLevel } from "../utils";
import { items } from "./constants/items";
import { getCharacter } from "./getCharacter";

export const getItems = async (
    characterId: string
): Promise<{ gold: number; items: Item[] }> => {
    const character = await getCharacter(characterId);

    const ownedItemIds = new Set(
        character.inventory.items.map((item) => item.id)
    );

    const level = getMainLevel(character.xp);

    return {
        gold: character.inventory.gold,
        items: items.map((item) => {
            const cost = item.cost + Math.floor(level.level * 10);
            const worth = Math.floor(cost * 0.8);

            return {
                ...item,
                owned: ownedItemIds.has(item.id),
                cost,
                worth,
            };
        }),
    };
};
