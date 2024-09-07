import { DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb";

import { Quest } from "../types";
import { getQuest } from "./getQuest";

export const updateQuest = async (
    characterId: string,
    quest: Partial<Quest>
): Promise<void> => {
    const client = new DynamoDBClient();

    if (!(await getQuest(characterId, quest.id!))) {
        throw new Error("Quest does not exist");
    }

    await client.send(
        new UpdateItemCommand({
            TableName: process.env.RPG_TABLE_NAME,
            Key: {
                characterId: { S: characterId },
                key: { S: `quest#${quest.id}` },
            },
            AttributeUpdates: {
                title: { Action: "PUT", Value: { S: quest.title! } },
                skill: { Action: "PUT", Value: { S: quest.skill! } },
                xp: { Action: "PUT", Value: { N: quest.xp!.toString() } },
                cooldown: {
                    Action: "PUT",
                    Value: { S: quest.cooldown || "Ten minutes" },
                },
            },
        })
    );
};
