import { Item, Quest } from "../../types";
import { roundNumber } from "../../utils/roundNumber";

const modifyXp = (quest: Quest, multipliers: Map<string, string[]>) => {
    const skillModifiers = multipliers.get(quest.skill) || [];
    const genericModifiers = multipliers.get("All") || [];
    const modifiers = [...skillModifiers, ...genericModifiers].sort();
    let modifiedXp = modifiers.reduce((xp, modifier) => {
        const [operator, value] = modifier.split(" ");
        return operator === "+"
            ? xp + parseFloat(value)
            : xp * parseFloat(value);
    }, quest.xp);

    modifiedXp =
        modifiedXp * (1 + Math.min(Math.floor(quest.streak / 5) * 0.1, 0.5));

    return roundNumber(modifiedXp);
};

export const parseRawQuest = (rawQuest: any, items: Item[]): Quest => {
    const ownedItems = items.filter((item) => item.owned);
    const xpMultipliersPerSkill = ownedItems.reduce((map, item) => {
        const skill = item.affectedSkill;
        const modifier = item.modifier;
        map.set(skill, [...(map.get(skill) || []), modifier]);
        return map;
    }, new Map<string, string[]>());

    const quest: Quest = {
        id: rawQuest.key.S!.split("#")[1],
        title: rawQuest.title.S!,
        skill: rawQuest.skill.S!,
        xp: parseFloat(rawQuest.xp.N!),
        modifiedXp: parseFloat(rawQuest.xp.N!),
        lastCompleted: parseFloat(rawQuest.lastCompleted?.N || 0),
        cooldown: rawQuest.cooldown?.S || "Ten minutes",
        streak: parseFloat(rawQuest.streak?.N || 0),
    };

    quest.modifiedXp = modifyXp(quest, xpMultipliersPerSkill);

    return quest;
};
