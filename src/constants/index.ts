export const levelNames = [
    "Novice",
    "Beginner",
    "Apprentice",
    "Trainee",
    "Initiate",
    "Adept",
    "Skilled",
    "Competent",
    "Proficient",
    "Expert",
    "Veteran",
    "Specialist",
    "Elite",
    "Master",
    "Grandmaster",
    "Champion",
    "Hero",
    "Legend",
    "Mythic",
    "Sage",
    "Guardian",
    "Warden",
    "Crusader",
    "Conqueror",
    "Vanquisher",
    "Paragon",
    "Virtuoso",
    "Ascendant",
    "Exemplar",
    "Titan",
    "Immortal",
    "Demigod",
    "Deity",
    "Celestial",
    "Divine",
    "Supreme",
    "Omniscient",
    "Omnipotent",
    "Infinite",
    "Eternal",
    "Transcendent",
    "Cosmic Being",
    "Universe Guardian",
    "Time Weaver",
    "Dimension Walker",
    "Reality Shaper",
    "Etherial",
    "Ethereal",
    "Astral",
    "Nether",
    "Voidwalker",
    "Space Lord",
    "Nebula King",
    "Star Lord",
    "Galactic Emperor",
    "Universal Monarch",
    "Cosmic Ruler",
    "Infinity Guardian",
    "Infinity King",
    "Boundless",
    "Limitless",
    "Absolute",
    "Supreme Entity",
    "Alpha",
    "Omega",
    "Ultimate Being",
    "Prime Being",
    "Omniverse Ruler",
    "Divine Architect",
    "Eternal Sovereign",
    "Infinity Overlord",
    "Supreme Sovereign",
    "Absolute Monarch",
    "Infinite Deity",
    "Primordial",
    "Ancient One",
    "All-Knowing",
    "All-Seeing",
    "All-Powerful",
    "The One",
    "The Eternal",
    "The Infinite",
    "The Absolute",
    "The Supreme",
    "The Ultimate",
    "The Primordial",
    "The Ancient",
    "The Omniscient",
    "The Omnipotent",
    "The Eternal One",
    "The Infinite One",
    "The Absolute One",
    "The Supreme One",
    "The Ultimate One",
    "The Primordial One",
    "The Ancient One",
    "The All-Knowing",
    "The All-Powerful",
    "Omniverse Architect",
];

// created with growth rate of 1.05997, starting from 10
export const mainLevelThresholds = [
    10, 20, 31, 42, 54, 67, 81, 96, 111, 127, 144, 162, 182, 203, 225, 248, 273,
    299, 327, 357, 389, 422, 458, 496, 536, 578, 623, 671, 722, 776, 833, 893,
    957, 1025, 1097, 1173, 1254, 1340, 1431, 1527, 1629, 1737, 1852, 1974, 2103,
    2240, 2385, 2539, 2702, 2875, 3058, 3252, 3458, 3677, 3909, 4155, 4415,
    4691, 4984, 5294, 5623, 5972, 6341, 6733, 7148, 7588, 8055, 8550, 9074,
    9630, 10219, 10843, 11505, 12207, 12951, 13739, 14575, 15461, 16400, 17395,
    18450, 19568, 20753, 22010, 23342, 24754, 26251, 27837, 29519, 31301, 33190,
    35193, 37316, 39566, 41951, 44479, 47159, 50000,
];

// created with growth rate of 1.03825, starting from 5
export const subLevelThresholds = [
    5, 10, 15, 20, 25, 31, 37, 43, 49, 56, 63, 70, 77, 85, 93, 101, 110, 119,
    128, 138, 148, 158, 169, 180, 192, 204, 217, 230, 244, 258, 273, 289, 305,
    322, 339, 357, 376, 396, 416, 437, 459, 482, 506, 531, 557, 584, 612, 641,
    671, 702, 734, 767, 802, 838, 875, 914, 954, 996, 1040, 1085, 1132, 1181,
    1232, 1285, 1340, 1397, 1456, 1517, 1581, 1647, 1716, 1787, 1861, 1938,
    2018, 2101, 2187, 2276, 2369, 2466, 2566, 2670, 2778, 2890, 3007, 3128,
    3254, 3384, 3520, 3661, 3807, 3959, 4117, 4281, 4451, 4627, 4810, 5000,
];

export const skills = [
    { name: "Charisma", type: "social" }, // public speaking, networking, negotiation, etc.
    { name: "Empathy", type: "social" }, // active listening, volunteering, etc.
    { name: "Strength", type: "health" }, // physical strength, muscle mass, etc.
    { name: "Endurance", type: "health" }, // stamina, pain tolerance, etc.
    { name: "Nutrition", type: "health" }, // diet, hydration, etc.
    { name: "Sleep hygiene", type: "health" }, // sleep quality, sleep schedule, etc.
    { name: "Finance", type: "practical" }, // budgeting, investing, etc.
    { name: "Time management", type: "practical" }, // planning, prioritization, etc.
    { name: "Mental clarity", type: "mental" }, // meditation, journaling, etc.
    { name: "Creativity", type: "mental" }, // writing, music, art, etc.
    { name: "Wisdom", type: "mental" }, // reading, learning a language, etc.
    { name: "Tech proficiency", type: "technical" }, // coding, graphic design, data anaysis, etc.
    { name: "Maintenance", type: "technical" }, // car maintenance, home repair, etc.
    { name: "Art", type: "creativity" }, // painting, drawing, etc.
    { name: "Writing", type: "creativity" }, // blogging, poetry, etc.
    { name: "Music", type: "creativity" }, // playing an instrument, singing, etc.
];

export const skillNames = skills.map((skill) => skill.name);
