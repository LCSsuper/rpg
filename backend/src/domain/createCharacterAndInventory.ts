import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { randomUUID } from "crypto";
import { Variant } from "../types";

export const createCharacterAndInventory = async (
    name: string,
    variant: Variant
): Promise<string> => {
    const client = new DynamoDBClient();

    const characterId = randomUUID();

    await client.send(
        new PutItemCommand({
            TableName: process.env.RPG_TABLE_NAME,
            Item: {
                characterId: { S: characterId },
                key: { S: "character" },
                name: { S: name },
                xp: { N: "0" },
                charisma_xp: { N: "0" },
                empathy_xp: { N: "0" },
                strength_xp: { N: "0" },
                endurance_xp: { N: "0" },
                nutrition_xp: { N: "0" },
                sleep_hygiene_xp: { N: "0" },
                finance_xp: { N: "0" },
                time_management_xp: { N: "0" },
                mental_clarity_xp: { N: "0" },
                creativity_xp: { N: "0" },
                wisdom_xp: { N: "0" },
                tech_proficiency_xp: { N: "0" },
                maintenance_xp: { N: "0" },
                art_xp: { N: "0" },
                writing_xp: { N: "0" },
                music_xp: { N: "0" },
                variant: { S: variant },
            },
        })
    );

    await client.send(
        new PutItemCommand({
            TableName: process.env.RPG_TABLE_NAME,
            Item: {
                characterId: { S: characterId },
                key: { S: "inventory" },
                gold: { N: "0" },
            },
        })
    );

    return characterId;
};
