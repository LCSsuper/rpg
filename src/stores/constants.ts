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
    "Creator",
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
    "The Omniverse Architect",
];

// created with growth rate of 1.05847, starting from 10
export const mainLevelThresholds = [
    10, 20, 31, 42, 54, 67, 81, 95, 110, 126, 143, 161, 180, 200, 222, 245, 269,
    295, 322, 351, 382, 414, 448, 484, 523, 564, 607, 653, 702, 753, 807, 865,
    926, 991, 1060, 1133, 1210, 1291, 1377, 1468, 1565, 1667, 1775, 1890, 2011,
    2139, 2275, 2419, 2571, 2732, 2903, 3084, 3275, 3478, 3693, 3920, 4160,
    4415, 4684, 4969, 5271, 5591, 5929, 6287, 6666, 7067, 7492, 7942, 8418,
    8922, 9455, 10020, 10618, 11251, 11921, 12630, 13380, 14174, 15015, 15905,
    16847, 17844, 18899, 20016, 21199, 22451, 23776, 25178, 26662, 28233, 29896,
    31656, 33519, 35491, 37579, 39789, 42128, 44604, 47225, 49999,
];

// created with growth rate of 1.037205, starting from 5
export const subLevelThresholds = [
    5, 10, 15, 20, 25, 31, 37, 43, 49, 55, 62, 69, 76, 84, 92, 100, 108, 117,
    126, 136, 146, 156, 167, 178, 190, 202, 214, 227, 240, 254, 268, 283, 299,
    315, 332, 349, 367, 386, 406, 426, 447, 469, 492, 516, 540, 565, 591, 618,
    646, 675, 706, 738, 771, 805, 840, 877, 915, 955, 996, 1039, 1083, 1129,
    1177, 1226, 1277, 1330, 1385, 1442, 1501, 1563, 1627, 1693, 1762, 1833,
    1907, 1984, 2064, 2147, 2233, 2322, 2414, 2510, 2609, 2712, 2819, 2930,
    3045, 3165, 3289, 3418, 3551, 3689, 3833, 3982, 4136, 4296, 4462, 4634,
    4813, 4999,
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
