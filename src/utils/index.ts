import {
    levelNames,
    mainLevelThresholds,
    subLevelThresholds,
} from "../constants";
import { Level } from "../types";

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
