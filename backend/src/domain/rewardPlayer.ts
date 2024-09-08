import {
    DynamoDBClient,
    UpdateItemCommand,
    UpdateItemCommandInput,
} from "@aws-sdk/client-dynamodb";

import { getLevelReward } from "../utils";
import { items } from "./constants/items";
import { Character } from "../types";

export const rewardPlayer = async (
    character: Character,
    newTotalXp: number,
    rewardType: "main" | "sub"
): Promise<{ gold: number; item?: string }> => {
    const client = new DynamoDBClient();

    const { gold, itemId } = getLevelReward(newTotalXp, character, rewardType);

    const input: UpdateItemCommandInput = {
        TableName: process.env.RPG_TABLE_NAME,
        Key: {
            characterId: { S: character.id },
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
