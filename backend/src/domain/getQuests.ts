import {
    DynamoDBClient,
    QueryCommand,
    QueryCommandInput,
} from "@aws-sdk/client-dynamodb";

import { Quest } from "../types";
import { getItems } from "./getItems";
import { parseRawQuest } from "./helpers/parseRawQuest";

export const getQuests = async (
    characterId: string,
    skill?: string
): Promise<Quest[]> => {
    const client = new DynamoDBClient();

    const input: QueryCommandInput = {
        TableName: process.env.RPG_TABLE_NAME,
        KeyConditionExpression:
            "characterId = :characterId and begins_with(#key, :type)",
        ExpressionAttributeNames: {
            "#key": "key",
        },
        ExpressionAttributeValues: {
            ":characterId": { S: characterId },
            ":type": {
                S: "quest#",
            },
        },
    };

    if (skill) {
        input.FilterExpression = "skill = :skill";
        input.ExpressionAttributeValues![":skill"] = { S: skill };
    }

    const rawQuests = await client.send(new QueryCommand(input));

    if (!rawQuests.Items?.length) return [];

    const { items } = await getItems(characterId);

    const quests: Quest[] = rawQuests.Items?.map((rawQuest) =>
        parseRawQuest(rawQuest, items)
    );

    return quests;
};
