import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { randomUUID } from "crypto";

import { Quest } from "../types";

export const createQuest = async (
    characterId: string,
    quest: Partial<Quest>
): Promise<void> => {
    const client = new DynamoDBClient();

    await client.send(
        new PutItemCommand({
            TableName: process.env.RPG_TABLE_NAME,
            Item: {
                characterId: { S: characterId },
                key: { S: `quest#${randomUUID()}` },
                title: { S: quest.title! },
                skill: { S: quest.skill! },
                xp: { N: quest.xp!.toString() },
                cooldown: { S: quest.cooldown || "Ten minutes" },
            },
        })
    );
};
