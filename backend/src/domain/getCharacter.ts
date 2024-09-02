import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";

import { Character } from "../types";
import { getInventory } from "./getInventory";
import { parseRawCharacter } from "./helpers/parseRawCharacter";

export const getCharacter = async (characterId: string): Promise<Character> => {
    const client = new DynamoDBClient();

    const character = await client.send(
        new GetItemCommand({
            TableName: process.env.RPG_TABLE_NAME,
            Key: {
                characterId: { S: characterId },
                key: { S: "character" },
            },
        })
    );

    if (!character.Item) {
        throw new Error("Character does not exist");
    }

    const inventory = await getInventory(characterId);

    return parseRawCharacter(characterId, character.Item, inventory);
};
