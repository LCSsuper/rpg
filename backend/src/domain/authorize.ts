import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";

export const authorize = async (
    authorizationHeader?: string
): Promise<void> => {
    const client = new DynamoDBClient();

    const authorization = await client.send(
        new GetItemCommand({
            TableName: process.env.RPG_TABLE_NAME,
            Key: {
                characterId: { S: "all" },
                key: { S: "authorization" },
            },
        })
    );

    if (!authorization.Item) {
        throw new Error("Authorization record does not exist");
    }

    if (authorization.Item.token.S !== authorizationHeader) {
        throw new Error("Unauthorized");
    }
};
