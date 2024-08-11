import { faker } from "@faker-js/faker";

import { Character, Quest } from "../types";
import { skillNames } from "../constants";

export const getCharacter = async (): Promise<Character> => {
    // TODO @Lucas fetch character data from the backend

    await new Promise((resolve) => setTimeout(resolve, 50));

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

    return Array.from({ length: faker.number.int({ min: 0, max: 10 }) }).map(
        () => ({
            title: faker.lorem.words({ min: 2, max: 8 }),
            skill: skillNames[Math.floor(Math.random() * skillNames.length)],
            xp: [0.1, 0.5, 1, 2][Math.floor(Math.random() * 4)],
        })
    );
};
