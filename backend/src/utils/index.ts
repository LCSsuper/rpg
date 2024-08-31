import {
    levelNames,
    mainLevelThresholds,
    subLevelThresholds,
} from "../constants";
import { items } from "../domain/constants/items";
import { Item, Level } from "../types";

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

export const getLevelReward = (xp: number, currentItems: Item[]) => {
    const mainLevel = getMainLevel(xp);

    // TODO @Lucas give an item for a skill that the character has the least xp in
    let itemId: string | undefined;
    if (mainLevel.level % 5 === 0) {
        const allItemIds = items.map((item) => item.id);
        const itemIds = new Set(currentItems.map((item) => item.id));
        // TODO @Lucas use Set.prototype.difference when it's available (Node 22)
        const rewardableItemIds = allItemIds.filter(
            (itemId) => !itemIds.has(itemId)
        );
        itemId =
            rewardableItemIds[
                Math.floor(Math.random() * rewardableItemIds.length)
            ];
    }

    return {
        gold: Math.floor(mainLevel.xpNeededToNextLevel ** 1.6),
        itemId,
    };
};
