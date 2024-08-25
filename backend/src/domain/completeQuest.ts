import { DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb";

import { Quest } from "../types";
import { getQuest } from "./getQuest";
import { getMainLevel } from "../utils";
import { rewardPlayer } from "./rewardPlayer";

const skillMap: Record<string, string> = {
    Charisma: "charisma_xp",
    Empathy: "empathy_xp",
    Strength: "strength_xp",
    Endurance: "endurance_xp",
    Nutrition: "nutrition_xp",
    "Sleep Hygiene": "sleep_hygiene_xp",
    Finance: "finance_xp",
    "Time Management": "time_management_xp",
    "Mental Clarity": "mental_clarity_xp",
    Creativity: "creativity_xp",
    Wisdom: "wisdom_xp",
    "Tech Proficiency": "tech_proficiency_xp",
    Maintenance: "maintenance_xp",
    Art: "art_xp",
    Writing: "writing_xp",
    Music: "music_xp",
};

export const completeQuest = async (
    characterId: string,
    questId: string
): Promise<boolean> => {
    const client = new DynamoDBClient();

    const quest = await getQuest(characterId, questId);
    const skillXpToAdd = skillMap[quest.skill];

    if (!skillXpToAdd) {
        throw new Error("Invalid skill");
    }

    const updatedCharacter = await client.send(
        new UpdateItemCommand({
            TableName: process.env.RPG_TABLE_NAME,
            Key: {
                characterId: { S: characterId },
                key: { S: "character" },
            },
            AttributeUpdates: {
                xp: { Action: "ADD", Value: { N: quest.xp!.toString() } },
                [skillXpToAdd]: {
                    Action: "ADD",
                    Value: { N: quest.xp!.toString() },
                },
            },
            ReturnValues: "ALL_NEW",
        })
    );

    const newTotalXp = parseInt(updatedCharacter.Attributes!.xp.N!);

    const leveledUp =
        getMainLevel(newTotalXp).level !==
        getMainLevel(newTotalXp - quest.xp).level;

    if (leveledUp) {
        await rewardPlayer(characterId, newTotalXp);
    }

    return leveledUp;
};
