import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";

import { Inventory } from "../types";

export const getInventory = async (characterId: string): Promise<Inventory> => {
    const client = new DynamoDBClient();

    const inventory = await client.send(
        new GetItemCommand({
            TableName: process.env.RPG_TABLE_NAME,
            Key: {
                characterId: { S: characterId },
                key: { S: "inventory" },
            },
        })
    );

    if (!inventory.Item) {
        throw new Error("Inventory does not exist");
    }

    return {
        items: inventory.Item.items?.SS || [],
        gold: parseInt(inventory.Item.gold.N!),
    };
};
