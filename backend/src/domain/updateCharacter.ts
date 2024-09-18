import { DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb";

import { Variant } from "../types";
import { getCharacter } from "./getCharacter";

export const updateCharacter = async (
    characterId: string,
    name: string,
    variant: Variant
): Promise<void> => {
    const client = new DynamoDBClient();

    if (!(await getCharacter(characterId))) {
        throw new Error("Character does not exist");
    }

    await client.send(
        new UpdateItemCommand({
            TableName: process.env.RPG_TABLE_NAME,
            Key: {
                characterId: { S: characterId },
                key: { S: "character" },
            },
            AttributeUpdates: {
                name: { Action: "PUT", Value: { S: name } },
                variant: { Action: "PUT", Value: { S: variant } },
            },
        })
    );
};
