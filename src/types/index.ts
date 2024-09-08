export type Skill = {
    name: string;
    type: string;
    level?: Level;
};

export type ItemType =
    | "pendant"
    | "glove"
    | "vial"
    | "shell"
    | "cloak"
    | "armor"
    | "elixir"
    | "band"
    | "amulet"
    | "hourglass"
    | "apple"
    | "satchel"
    | "seed"
    | "charm"
    | "scarf"
    | "blanket"
    | "coin"
    | "ledger"
    | "box"
    | "crystal"
    | "purse"
    | "ring"
    | "pen"
    | "sands"
    | "stone"
    | "herb"
    | "quill"
    | "ink"
    | "canvas"
    | "spark"
    | "scroll"
    | "orb"
    | "tome"
    | "hammer"
    | "lute"
    | "book"
    | "harp"
    | "baton"
    | "string"
    | "muse"
    | "bracelet"
    | "mirror"
    | "toolkit"
    | "oil"
    | "blueprint"
    | "gauntlet"
    | "breaker"
    | "boots"
    | "shield"
    | "potion";

export type Item = {
    id: string;
    name: string;
    description: string;
    affectedSkill: string;
    modifier: number;
    cost: number;
    worth: number;
    type: ItemType;
    owned?: boolean;
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

export type Quest = {
    id: string;
    title: string;
    xp: number;
    modifiedXp: number;
    skill: string;
    lastCompleted?: number;
    cooldown?: string;
};

export type CompleteQuestResponse = {
    main: {
        leveledUp: boolean;
        newLevel?: number;
        reward?: { gold: number; item?: string };
    };
    sub: {
        leveledUp: boolean;
        newLevel?: number;
        reward?: { gold: number; item?: string };
    };
};
