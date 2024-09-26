export type SkillName =
    | "Charisma"
    | "Empathy"
    | "Strength"
    | "Endurance"
    | "Nutrition"
    | "Sleep hygiene"
    | "Finance"
    | "Time management"
    | "Mental clarity"
    | "Creativity"
    | "Wisdom"
    | "Tech proficiency"
    | "Maintenance"
    | "Art"
    | "Writing"
    | "Music";

export type Skill = {
    name: SkillName;
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
    affectedSkill: SkillName | "All";
    modifier: string;
    cost: number;
    worth?: number;
    type: ItemType;
    owned?: boolean;
};

export type Inventory = {
    items: Item[];
    gold: number;
};

export const VARIANTS = [
    "darkacademia",
    "skater",
    "cyberpunk",
    "vampire",
    "earthy",
    "anime",
] as const;
type VariantTuple = typeof VARIANTS;
export type Variant = VariantTuple[number];

export type Character = {
    id: string;
    name: string;
    xp: number;
    inventory: Inventory;
    skills: Record<SkillName, number>;
    variant: Variant;
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
    skill: SkillName;
    lastCompleted: number;
    cooldown?: string;
    streak: number;
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
