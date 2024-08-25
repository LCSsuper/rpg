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
        xp: parseInt(character.Item.xp.N!),
        inventory: await getInventory(characterId),
        skills: {
            Charisma: parseInt(character.Item.charisma_xp.N!),
            Empathy: parseInt(character.Item.empathy_xp.N!),
            Strength: parseInt(character.Item.strength_xp.N!),
            Endurance: parseInt(character.Item.endurance_xp.N!),
            Nutrition: parseInt(character.Item.nutrition_xp.N!),
            "Sleep hygiene": parseInt(character.Item.sleep_hygiene_xp.N!),
            Finance: parseInt(character.Item.finance_xp.N!),
            "Time management": parseInt(character.Item.time_management_xp.N!),
            "Mental clarity": parseInt(character.Item.mental_clarity_xp.N!),
            Creativity: parseInt(character.Item.creativity_xp.N!),
            Wisdom: parseInt(character.Item.wisdom_xp.N!),
            "Tech proficiency": parseInt(character.Item.tech_proficiency_xp.N!),
            Maintenance: parseInt(character.Item.maintenance_xp.N!),
            Art: parseInt(character.Item.art_xp.N!),
            Writing: parseInt(character.Item.writing_xp.N!),
            Music: parseInt(character.Item.music_xp.N!),
        },
    };
};
