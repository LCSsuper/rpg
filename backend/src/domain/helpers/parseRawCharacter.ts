import { Character, Inventory } from "../../types";

export const parseRawCharacter = (
    characterId: string,
    rawCharacter: any,
    inventory: Inventory
): Character => ({
    id: characterId,
    name: rawCharacter.name.S!,
    xp: parseFloat(rawCharacter.xp.N!),
    inventory,
    skills: {
        Charisma: parseFloat(rawCharacter.charisma_xp.N!),
        Empathy: parseFloat(rawCharacter.empathy_xp.N!),
        Strength: parseFloat(rawCharacter.strength_xp.N!),
        Endurance: parseFloat(rawCharacter.endurance_xp.N!),
        Nutrition: parseFloat(rawCharacter.nutrition_xp.N!),
        "Sleep hygiene": parseFloat(rawCharacter.sleep_hygiene_xp.N!),
        Finance: parseFloat(rawCharacter.finance_xp.N!),
        "Time management": parseFloat(rawCharacter.time_management_xp.N!),
        "Mental clarity": parseFloat(rawCharacter.mental_clarity_xp.N!),
        Creativity: parseFloat(rawCharacter.creativity_xp.N!),
        Wisdom: parseFloat(rawCharacter.wisdom_xp.N!),
        "Tech proficiency": parseFloat(rawCharacter.tech_proficiency_xp.N!),
        Maintenance: parseFloat(rawCharacter.maintenance_xp.N!),
        Art: parseFloat(rawCharacter.art_xp.N!),
        Writing: parseFloat(rawCharacter.writing_xp.N!),
        Music: parseFloat(rawCharacter.music_xp.N!),
    },
});
