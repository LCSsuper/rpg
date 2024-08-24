export type Skill = {
    name: string;
    type: string;
    level?: Level;
};

export type Item = {
    id: string;
    name: string;
    description: string;
    type: string;
    effect: string;
    value: number;
};

export type Inventory = {
    items: Item[];
    gold: number;
};

export type Character = {
    id: string;
    name: string;
    xp: number;
    inventory: Inventory;
    skills: Record<string, number>;
};

export type Level = {
    level: number;
    progress: number;
    title: string;
    xpNeededToNextLevel: number;
    xpGatheredInLevel: number;
};

export type Quest = { id: string; title: string; xp: number; skill: string };
