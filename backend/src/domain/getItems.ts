import { Item } from "../types";
import { getMainLevel } from "../utils";
import { items } from "./constants/items";
import { getCharacter } from "./getCharacter";

const inflate = (cost: number, level: number) => {
    return cost + Math.floor(level / 5) * 50;
};

const devalue = (cost: number, level: number) => {
    return cost - Math.floor(level / 5) * 20;
};

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
            const cost = inflate(item.cost, level.level);
            const worth = devalue(cost, level.level);

            return {
                ...item,
                owned: ownedItemIds.has(item.id),
                cost,
                worth,
            };
        }),
    };
};
