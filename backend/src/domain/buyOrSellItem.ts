import {
    DynamoDBClient,
    UpdateItemCommand,
    UpdateItemCommandInput,
} from "@aws-sdk/client-dynamodb";
import { getItems } from "./getItems";

export const buyOrSellItem = async (
    characterId: string,
    itemId: string,
    action: "buy" | "sell"
): Promise<void> => {
    const { items, gold } = await getItems(characterId);
    const item = items.find((item) => item.id === itemId)!;

    if (!item) {
        throw new Error("Item does not exist");
    }

    if (action === "buy" && item.owned) {
        throw new Error("Item is already owned");
    }

    if (action === "sell" && !item.owned) {
        throw new Error("Item is not owned");
    }

    if (action === "buy" && item.cost > gold) {
        throw new Error("Not enough money");
    }

    const client = new DynamoDBClient();

    const input: UpdateItemCommandInput = {
        TableName: process.env.RPG_TABLE_NAME,
        Key: {
            characterId: { S: characterId },
            key: { S: "inventory" },
        },
        AttributeUpdates: {
            gold: {
                Action: "ADD",
                Value: {
                    N: (action === "buy" ? -item.cost : item.worth!).toString(),
                },
            },
            items: {
                Action: action === "buy" ? "ADD" : "DELETE",
                Value: { SS: [itemId] },
            },
        },
    };

    await client.send(new UpdateItemCommand(input));
};
