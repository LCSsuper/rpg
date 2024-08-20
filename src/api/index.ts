import { faker } from "@faker-js/faker";

import { Character, Quest } from "../types";
import { skillNames } from "../constants";

const mockData = false;

const character: Character = {
    name: "Lucas",
    xp: 0,
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

const quests: Quest[] = [];

export const getCharacter = async (): Promise<Character> => {
    // TODO @Lucas fetch character data from the backend

    await new Promise((resolve) => setTimeout(resolve, 50));

    if (!mockData) return character;

    return Promise.resolve({
        name: "Lucas",
        xp: faker.number.int({ min: 0, max: 50000 }),
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

export const getQuests = async (): Promise<Quest[]> => {
    // TODO @Lucas fetch quest data from the backend

    await new Promise((resolve) => setTimeout(resolve, 50));

    if (!mockData) return quests;

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

export const completeQuest = async (quest: Quest): Promise<void> => {
    // TODO @Lucas send complete quest request to the backend

    await new Promise((resolve) => setTimeout(resolve, 150));

    character.xp += quest.xp;
    character.skills[quest.skill] += quest.xp;

    return Promise.resolve();
};
