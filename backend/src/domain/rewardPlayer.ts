import {
    DynamoDBClient,
    UpdateItemCommand,
    UpdateItemCommandInput,
} from "@aws-sdk/client-dynamodb";

import { getLevelReward } from "../utils";
import { getInventory } from "./getInventory";
import { items } from "./constants/items";

export const rewardPlayer = async (
    characterId: string,
    newTotalXp: number
): Promise<{ gold: number; item?: string }> => {
    const client = new DynamoDBClient();

    const inventory = await getInventory(characterId);

    const { gold, itemId } = getLevelReward(newTotalXp, inventory.items);

    const input: UpdateItemCommandInput = {
        TableName: process.env.RPG_TABLE_NAME,
        Key: {
            characterId: { S: characterId },
            key: { S: "inventory" },
        },
        AttributeUpdates: {
            gold: {
                Action: "ADD",
                Value: { N: gold.toString() },
            },
        },
    };

    if (itemId) {
        input.AttributeUpdates!.items = {
            Action: "ADD",
            Value: { SS: [itemId] },
        };
    }

    await client.send(new UpdateItemCommand(input));

    return { gold, item: items.find((i) => i.id === itemId)?.name };
};
