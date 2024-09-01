import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";

import { Quest } from "../types";
import { parseRawQuest } from "./helpers/parseRawQuest";
import { getItems } from "./getItems";

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

    const { items } = await getItems(characterId);

    return parseRawQuest(quests.Item, items);
};
