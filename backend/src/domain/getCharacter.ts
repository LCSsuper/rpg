import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";

import { Character } from "../types";
import { getInventory } from "./getInventory";

export const getCharacter = async (characterId: string): Promise<Character> => {
    const client = new DynamoDBClient();

    const character = await client.send(
        new GetItemCommand({
            TableName: process.env.RPG_TABLE_NAME,
            Key: {
                characterId: { S: characterId },
                key: { S: "character" },
            },
        })
    );

    if (!character.Item) {
        throw new Error("Character does not exist");
    }

    return {
        id: characterId,
        name: character.Item.name.S!,
        xp: parseFloat(character.Item.xp.N!),
        inventory: await getInventory(characterId),
        skills: {
            Charisma: parseFloat(character.Item.charisma_xp.N!),
            Empathy: parseFloat(character.Item.empathy_xp.N!),
            Strength: parseFloat(character.Item.strength_xp.N!),
            Endurance: parseFloat(character.Item.endurance_xp.N!),
            Nutrition: parseFloat(character.Item.nutrition_xp.N!),
            "Sleep hygiene": parseFloat(character.Item.sleep_hygiene_xp.N!),
            Finance: parseFloat(character.Item.finance_xp.N!),
            "Time management": parseFloat(character.Item.time_management_xp.N!),
            "Mental clarity": parseFloat(character.Item.mental_clarity_xp.N!),
            Creativity: parseFloat(character.Item.creativity_xp.N!),
            Wisdom: parseFloat(character.Item.wisdom_xp.N!),
            "Tech proficiency": parseFloat(
                character.Item.tech_proficiency_xp.N!
            ),
            Maintenance: parseFloat(character.Item.maintenance_xp.N!),
            Art: parseFloat(character.Item.art_xp.N!),
            Writing: parseFloat(character.Item.writing_xp.N!),
            Music: parseFloat(character.Item.music_xp.N!),
        },
    };
};
