import { faker } from "@faker-js/faker";

import { Character, Item, Quest } from "../types";
import { skillNames } from "../constants";
import { getLevelReward, getMainLevel } from "../utils";

const mockData = false;

const character: Character = {
    id: "bf01802f-fffc-4d50-977f-69f1d3850a9e",
    name: "Lucas",
    xp: 0,
    inventory: {
        items: [],
        gold: 0,
    },
    skills: {
        Charisma: 0,
        Empathy: 0,
        Strength: 0,
        Endurance: 0,
        Nutrition: 0,
        "Sleep hygiene": 0,
        Finance: 0,
        "Time management": 0,
        "Mental clarity": 0,
        Creativity: 0,
        Wisdom: 0,
        "Tech proficiency": 0,
        Maintenance: 0,
        Art: 0,
        Writing: 0,
        Music: 0,
    },
};

const quests: Quest[] = [
    { title: "test1", skill: "Charisma", xp: 1, id: "1" },
    { title: "test2", skill: "Charisma", xp: 2, id: "2" },
    { title: "test3", skill: "Charisma", xp: 5, id: "3" },
    { title: "test4", skill: "Charisma", xp: 10, id: "4" },
    { title: "test5", skill: "Charisma", xp: 50, id: "5" },
];

export const getCharacter = async (): Promise<Character> => {
    // TODO @Lucas fetch character data from the backend

    await new Promise((resolve) => setTimeout(resolve, 50));

    if (!mockData) return character;

    return Promise.resolve({
        id: "bf01802f-fffc-4d50-977f-69f1d3850a9e",
        name: "Lucas",
        xp: faker.number.int({ min: 0, max: 50000 }),
        inventory: {
            items: [],
            gold: faker.number.int({ min: 0, max: 1000 }),
        },
        skills: {
            Charisma: faker.number.int({ min: 0, max: 5000 }),
            Empathy: faker.number.int({ min: 0, max: 5000 }),
            Strength: faker.number.int({ min: 0, max: 5000 }),
            Endurance: faker.number.int({ min: 0, max: 5000 }),
            Nutrition: faker.number.int({ min: 0, max: 5000 }),
            "Sleep hygiene": faker.number.int({ min: 0, max: 5000 }),
            Finance: faker.number.int({ min: 0, max: 5000 }),
            "Time management": faker.number.int({ min: 0, max: 5000 }),
            "Mental clarity": faker.number.int({ min: 0, max: 5000 }),
            Creativity: faker.number.int({ min: 0, max: 5000 }),
            Wisdom: faker.number.int({ min: 0, max: 5000 }),
            "Tech proficiency": faker.number.int({ min: 0, max: 5000 }),
            Maintenance: faker.number.int({ min: 0, max: 5000 }),
            Art: faker.number.int({ min: 0, max: 5000 }),
            Writing: faker.number.int({ min: 0, max: 5000 }),
            Music: faker.number.int({ min: 0, max: 5000 }),
        },
    });
};

export const getQuests = async (skill?: string): Promise<Quest[]> => {
    // TODO @Lucas fetch quest data from the backend

    await new Promise((resolve) => setTimeout(resolve, 50));

    if (!mockData) return quests.filter((q) => !skill || q.skill === skill);

    return Array.from({ length: faker.number.int({ min: 0, max: 10 }) }).map(
        () => ({
            id: faker.string.uuid(),
            title: faker.lorem.words({ min: 2, max: 8 }),
            skill: skillNames[Math.floor(Math.random() * skillNames.length)],
            xp: [0.1, 0.5, 1, 2][Math.floor(Math.random() * 4)],
        })
    );
};

export const createQuest = async (quest: Quest): Promise<void> => {
    // TODO @Lucas send quest to the backend

    await new Promise((resolve) => setTimeout(resolve, 150));

    quests.push(quest);

    return Promise.resolve();
};

export const updateQuest = async (quest: Quest): Promise<void> => {
    // TODO @Lucas send updated quest to the backend

    await new Promise((resolve) => setTimeout(resolve, 150));

    console.log("😻", quests, quest);

    const index = quests.findIndex((q) => q.id === quest.id);

    if (index === -1) return Promise.resolve();

    quests[index] = quest;

    return Promise.resolve();
};

export const deleteQuest = async (quest: Quest): Promise<void> => {
    // TODO @Lucas send delete request to the backend

    await new Promise((resolve) => setTimeout(resolve, 150));

    const index = quests.findIndex((q) => q.id === quest.id);

    if (index === -1) return Promise.resolve();

    quests.splice(index, 1);

    return Promise.resolve();
};

export const completeQuest = async (
    quest: Quest
): Promise<{ leveledUp: boolean }> => {
    // TODO @Lucas send complete quest request to the backend

    await new Promise((resolve) => setTimeout(resolve, 150));

    const leveledUp =
        getMainLevel(character.xp).level !==
        getMainLevel(character.xp + quest.xp).level;

    character.xp += quest.xp;
    character.skills[quest.skill] += quest.xp;

    if (leveledUp) {
        const reward = getLevelReward(getMainLevel(character.xp).level);
        character.inventory.gold += reward.gold;
    }

    return Promise.resolve({ leveledUp });
};

export const getItems = async (): Promise<Item[]> => {
    // TODO @Lucas fetch item data from the backend

    await new Promise((resolve) => setTimeout(resolve, 50));

    return [];
};
