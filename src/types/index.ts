export type Skill = {
    name: string;
    type: string;
    level?: Level;
};

export type Character = {
    name: string;
    xp: number;
    skills: Record<string, number>;
};

export type Level = { level: number; progress: number; title: string };

export type Quest = { title: string; xp: number; skill: string };
