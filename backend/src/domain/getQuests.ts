import {
    DynamoDBClient,
    QueryCommand,
    QueryCommandInput,
} from "@aws-sdk/client-dynamodb";

import { Quest } from "../types";

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

    const quests = await client.send(new QueryCommand(input));

    return (
        quests.Items?.map((quest) => ({
            id: quest.key.S!.split("#")[1],
            title: quest.title.S!,
            skill: quest.skill.S!,
            xp: parseInt(quest.xp.N!),
        })) || []
    );
};
