import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";

import { Quest } from "../types";

export const getQuest = async (
    characterId: string,
    questId: string
): Promise<Quest> => {
    const client = new DynamoDBClient();

    const quests = await client.send(
        new GetItemCommand({
            TableName: process.env.RPG_TABLE_NAME,
            Key: {
                characterId: { S: characterId },
                key: { S: `quest#${questId}` },
            },
        })
    );

    if (!quests.Item) {
        throw new Error("Quest not found");
    }

    return {
        id: quests.Item.key.S!.split("#")[1],
        title: quests.Item.title.S!,
        skill: quests.Item.skill.S!,
        xp: parseInt(quests.Item.xp.N!),
    };
};
