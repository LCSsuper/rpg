import {
    levelNames,
    mainLevelThresholds,
    subLevelThresholds,
} from "../constants";
import { Level, Quest } from "../types";
import { roundNumber } from "./roundNumber";

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

export const getLevelName = (level: number) => levelNames[level - 1] || "Max";

const getLevel = (xp: number, thresholds: number[]): Level => {
    const level = binarySearch(thresholds, xp) + 1;
    const title = levelNames[level];

    const from = thresholds[level - 1] || 0;
    const to = thresholds[level] || thresholds[level - 1];
    const xpNeededToNextLevel = roundNumber(to - from);
    const xpGatheredInLevel = roundNumber(xp - from);
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

export const getLevelReward = (level: number) => {
    const mainLevel = getMainLevel(level);

    // TODO @Lucas add item rewards
    return {
        gold: Math.floor(mainLevel.xpNeededToNextLevel ** 1.6),
    };
};

export const determineRemainingCooldown = (quest: Quest) => {
    if (!quest.lastCompleted) {
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

export const getCharacterImageSrc = (variant: string, level: number) => {
    // every 10 levels, there will be a new version of the character
    // const version = Math.floor(level / 10) + 1;
    const version = 1;
    return `./characters/${variant}/${version}.png`;
};
