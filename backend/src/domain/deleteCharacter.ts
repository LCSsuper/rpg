import {
    BatchWriteItemCommand,
    DynamoDBClient,
    QueryCommand,
} from "@aws-sdk/client-dynamodb";

export const deleteCharacter = async (characterId: string): Promise<void> => {
    const client = new DynamoDBClient();

    const { Items } = await client.send(
        new QueryCommand({
            TableName: process.env.RPG_TABLE_NAME,
            KeyConditionExpression: "characterId = :characterId",
            ExpressionAttributeValues: {
                ":characterId": { S: characterId },
            },
        })
    );

    if (!Items?.length) return;

    await client.send(
        new BatchWriteItemCommand({
            RequestItems: {
                [process.env.RPG_TABLE_NAME!]: Items.map((item) => ({
                    DeleteRequest: {
                        Key: {
                            characterId: item.characterId,
                            key: item.key,
                        },
                    },
                })),
            },
        })
    );
};
