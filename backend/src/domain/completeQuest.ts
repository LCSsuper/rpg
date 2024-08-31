import { DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb";

import { getQuest } from "./getQuest";
import { getMainLevel, getSkillLevel } from "../utils";
import { rewardPlayer } from "./rewardPlayer";
import { CompleteQuestResponse } from "../types";

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
): Promise<CompleteQuestResponse> => {
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

    const newMainXp = parseFloat(updatedCharacter.Attributes!.xp.N!);
    const newSkillXp = parseFloat(
        updatedCharacter.Attributes![skillXpToAdd].N!
    );

    const leveledUp =
        getMainLevel(newMainXp).level !==
        getMainLevel(newMainXp - quest.xp).level;

    const subLeveledUp =
        getSkillLevel(newSkillXp).level !==
        getSkillLevel(newSkillXp - quest.xp).level;

    const response = {
        main: { leveledUp },
        sub: { leveledUp: subLeveledUp },
    } as CompleteQuestResponse;

    if (leveledUp) {
        response.main.reward = await rewardPlayer(characterId, newMainXp);
        response.main.newLevel = getMainLevel(newMainXp).level;
    }

    if (subLeveledUp) {
        response.sub.reward = await rewardPlayer(characterId, newSkillXp);
        response.sub.newLevel = getSkillLevel(newSkillXp).level;
    }

    return response;
};
