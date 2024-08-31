import {
    DynamoDBClient,
    UpdateItemCommand,
    UpdateItemCommandInput,
} from "@aws-sdk/client-dynamodb";
import { items } from "./constants/items";
import { getInventory } from "./getInventory";

export const buyOrSellItem = async (
    characterId: string,
    itemId: string,
    action: "buy" | "sell"
): Promise<void> => {
    const itemIds = new Set(items.map((item) => item.id));

    if (!itemIds.has(itemId)) {
        throw new Error("Item does not exist");
    }

    const inventory = await getInventory(characterId);

    const ownedItemIds = new Set(inventory.items.map((item) => item.id));

    if (action === "buy" && ownedItemIds.has(itemId)) {
        throw new Error("Item is already owned");
    }

    if (action === "sell" && !ownedItemIds.has(itemId)) {
        throw new Error("Item is not owned");
    }

    const item = items.find((item) => item.id === itemId)!;

    if (action === "buy" && item.cost > inventory.gold) {
        throw new Error("Not enough money");
    }

    const client = new DynamoDBClient();

    const input: UpdateItemCommandInput = {
        TableName: process.env.RPG_TABLE_NAME,
        Key: {
            characterId: { S: characterId },
            key: { S: "inventory" },
        },
        AttributeUpdates: {
            gold: {
                Action: "ADD",
                Value: {
                    N: (action === "buy" ? -item.cost : item.cost).toString(),
                },
            },
            items: {
                Action: action === "buy" ? "ADD" : "DELETE",
                Value: { SS: [itemId] },
            },
        },
    };

    await client.send(new UpdateItemCommand(input));
};
