import {
    levelNames,
    mainLevelThresholds,
    subLevelThresholds,
} from "../constants";
import { items } from "../domain/constants/items";
import { Character, Level, Quest } from "../types";

const binarySearch = (array: number[], target: number) => {
    let left = 0;
    let right = array.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (array[mid] === target) {
            return mid;
        } else if (array[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return right;
};

const getLevel = (xp: number, thresholds: number[]): Level => {
    const level = binarySearch(thresholds, xp) + 1;
    const title = levelNames[level];

    const from = thresholds[level - 1] || 0;
    const to = thresholds[level] || thresholds[level - 1];
    const xpNeededToNextLevel = to - from;
    const xpGatheredInLevel = xp - from;
    const progress = xpNeededToNextLevel
        ? (xpGatheredInLevel / xpNeededToNextLevel) * 100
        : 100;

    return {
        level: level + 1,
        progress,
        title,
        xpNeededToNextLevel,
        xpGatheredInLevel,
    };
};

export const getMainLevel = (xp: number) => getLevel(xp, mainLevelThresholds);

export const getSkillLevel = (xp: number) => getLevel(xp, subLevelThresholds);

export const getLevelReward = (xp: number, character: Character) => {
    const mainLevel = getMainLevel(xp);

    const skills = Object.entries(character.skills).reduce(
        (map, [skill, xp]) => {
            map.set(xp, (map.get(xp) || []).concat(skill));
            return map;
        },
        new Map<number, string[]>()
    );

    const lowestXp = Math.min(...Array.from(skills.keys()).map(Number));
    const lowestXpSkills = skills.get(lowestXp) || [];
    const randomSkill =
        lowestXpSkills[Math.floor(Math.random() * lowestXpSkills.length)];

    let itemId: string | undefined;
    if (mainLevel.level % 5 === 0) {
        const availableItemIds = items
            .filter(
                (item) =>
                    item.affectedSkill !== "All" &&
                    (!randomSkill || item.affectedSkill === randomSkill)
            )
            .map((item) => item.id);

        const itemIds = new Set(
            character.inventory.items.map((item) => item.id)
        );
        // TODO @Lucas use Set.prototype.difference when it's available (Node 22)
        const rewardableItemIds = availableItemIds.filter(
            (itemId) => !itemIds.has(itemId)
        );

        if (rewardableItemIds.length) {
            itemId =
                rewardableItemIds[
                    Math.floor(Math.random() * rewardableItemIds.length)
                ];
        }
    }

    return {
        gold: Math.floor(mainLevel.xpNeededToNextLevel ** 1.6),
        itemId,
    };
};

export const determineRemainingCooldown = (quest: Quest) => {
    if (
        !quest.lastCompleted ||
        (quest.cooldown || "No cooldown") === "No cooldown"
    ) {
        return 0;
    }

    const now = Date.now();
    const lastCompleted = new Date(quest.lastCompleted).getTime();
    const cooldown: Record<string, number> = {
        "Ten minutes": 10 * 60 * 1000,
        "One hour": 60 * 60 * 1000,
        "One day": 24 * 60 * 60 * 1000,
    };

    return Math.floor(
        Math.max(cooldown[quest.cooldown!] - (now - lastCompleted), 0) / 1000
    );
};
