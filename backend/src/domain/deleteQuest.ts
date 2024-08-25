import { DeleteItemCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";

export const deleteQuest = async (
    characterId: string,
    questId: string
): Promise<void> => {
    const client = new DynamoDBClient();

    await client.send(
        new DeleteItemCommand({
            TableName: process.env.RPG_TABLE_NAME,
            Key: {
                characterId: { S: characterId },
                key: { S: `quest#${questId}` },
            },
        })
    );
};
