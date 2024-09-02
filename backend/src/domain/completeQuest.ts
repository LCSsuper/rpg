import { DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb";

import { getQuest } from "./getQuest";
import { getMainLevel, getSkillLevel } from "../utils";
import { rewardPlayer } from "./rewardPlayer";
import { CompleteQuestResponse, SkillName } from "../types";
import { parseRawCharacter } from "./helpers/parseRawCharacter";
import { getInventory } from "./getInventory";

const skillMap: Record<SkillName, string> = {
    Charisma: "charisma_xp",
    Empathy: "empathy_xp",
    Strength: "strength_xp",
    Endurance: "endurance_xp",
    Nutrition: "nutrition_xp",
    "Sleep hygiene": "sleep_hygiene_xp",
    Finance: "finance_xp",
    "Time management": "time_management_xp",
    "Mental clarity": "mental_clarity_xp",
    Creativity: "creativity_xp",
    Wisdom: "wisdom_xp",
    "Tech proficiency": "tech_proficiency_xp",
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
                xp: {
                    Action: "ADD",
                    Value: { N: quest.modifiedXp!.toString() },
                },
                [skillXpToAdd]: {
                    Action: "ADD",
                    Value: { N: quest.modifiedXp!.toString() },
                },
            },
            ReturnValues: "ALL_NEW",
        })
    );

    const inventory = await getInventory(characterId);
    const character = parseRawCharacter(
        characterId,
        updatedCharacter.Attributes!,
        inventory
    );

    const newMainXp = character.xp;
    const newSkillXp = character.skills[quest.skill];

    const leveledUp =
        getMainLevel(newMainXp).level !==
        getMainLevel(newMainXp - quest.modifiedXp).level;

    const subLeveledUp =
        getSkillLevel(newSkillXp).level !==
        getSkillLevel(newSkillXp - quest.modifiedXp).level;

    const response = {
        main: { leveledUp },
        sub: { leveledUp: subLeveledUp },
    } as CompleteQuestResponse;

    if (leveledUp) {
        response.main.reward = await rewardPlayer(character, newMainXp);
        response.main.newLevel = getMainLevel(newMainXp).level;
    }

    if (subLeveledUp) {
        response.sub.reward = await rewardPlayer(character, newSkillXp);
        response.sub.newLevel = getSkillLevel(newSkillXp).level;
    }

    return response;
};
