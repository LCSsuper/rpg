import { authorize } from "./domain/authorize";
import { completeQuest } from "./domain/completeQuest";
import { items } from "./domain/constants/items";
import { createCharacterAndInventory } from "./domain/createCharacterAndInventory";
import { createQuest } from "./domain/createQuest";
import { deleteQuest } from "./domain/deleteQuest";
import { disableRPGBackend } from "./domain/disableRPGBackend";
import { getCharacter } from "./domain/getCharacter";
import { getQuests } from "./domain/getQuests";
import { updateQuest } from "./domain/updateQuest";
import { Character, Item, Quest } from "./types";

type LambdaFunctionUrlPayload = {
    headers?: Record<string, string>;
    queryStringParameters?: Record<string, string>;
    body?: string;
};

const requestHandlerWrapper =
    (requestHandler: (payload: LambdaFunctionUrlPayload) => Promise<unknown>) =>
    async (
        payload: LambdaFunctionUrlPayload
    ): Promise<{ statusCode: number; body: string }> => {
        try {
            await authorize(payload.headers?.authorization);

            const response = await requestHandler(payload);

            return {
                statusCode: 200,
                body: JSON.stringify(response),
            };
        } catch (e) {
            console.log(e);
            return {
                statusCode: 400,
                body: JSON.stringify({ message: (e as Error).message }),
            };
        }
    };

export const createCharacterHandler = requestHandlerWrapper(
    async (
        payload: LambdaFunctionUrlPayload
    ): Promise<{
        characterId: string;
    }> => {
        const name = JSON.parse(payload.body || "{}").name;

        if (!name) {
            throw new Error("Name is required");
        }

        const characterId = await createCharacterAndInventory(name);

        return { characterId };
    }
);

export const getCharacterHandler = requestHandlerWrapper(
    async (payload: LambdaFunctionUrlPayload): Promise<Character> => {
        const characterId = payload.queryStringParameters?.characterId;

        if (!characterId) {
            throw new Error("CharacterId is required");
        }

        return getCharacter(characterId);
    }
);

export const getQuestsHandler = requestHandlerWrapper(
    async (payload: LambdaFunctionUrlPayload): Promise<Quest[]> => {
        const characterId = payload.queryStringParameters?.characterId;
        const skill = payload.queryStringParameters?.skill;

        if (!characterId) {
            throw new Error("CharacterId is required");
        }

        return getQuests(characterId, skill);
    }
);

export const createQuestHandler = requestHandlerWrapper(
    async (payload: LambdaFunctionUrlPayload): Promise<{ ok: boolean }> => {
        const characterId = payload.queryStringParameters?.characterId;
        const quest = JSON.parse(payload.body || "{}");

        if (!characterId) {
            throw new Error("CharacterId is required");
        }

        if (!quest?.title || !quest?.skill || !quest?.xp) {
            throw new Error("Title, skill and xp are required");
        }

        await createQuest(characterId, quest);

        return { ok: true };
    }
);

export const updateQuestHandler = requestHandlerWrapper(
    async (
        payload: LambdaFunctionUrlPayload
    ): Promise<{
        ok: boolean;
    }> => {
        const characterId = payload.queryStringParameters?.characterId;

        if (!characterId) {
            throw new Error("CharacterId is required");
        }

        const quest = JSON.parse(payload.body || "{}");

        if (!quest?.id || !quest?.title || !quest?.skill || !quest?.xp) {
            throw new Error("Id, title, skill and xp are required");
        }

        await updateQuest(characterId, quest);

        return { ok: true };
    }
);

export const deleteQuestHandler = requestHandlerWrapper(
    async (
        payload: LambdaFunctionUrlPayload
    ): Promise<{
        ok: boolean;
    }> => {
        const characterId = payload.queryStringParameters?.characterId;

        if (!characterId) {
            throw new Error("CharacterId is required");
        }

        const questId = payload.queryStringParameters?.questId;

        if (!questId) {
            throw new Error("QuestId is required");
        }

        await deleteQuest(characterId, questId);

        return { ok: true };
    }
);

export const completeQuestHandler = requestHandlerWrapper(
    async (
        payload: LambdaFunctionUrlPayload
    ): Promise<{
        leveledUp: boolean;
    }> => {
        const characterId = payload.queryStringParameters?.characterId;

        if (!characterId) {
            throw new Error("CharacterId is required");
        }

        const questId = payload.queryStringParameters?.questId;

        if (!questId) {
            throw new Error("QuestId is required");
        }

        const leveledUp = await completeQuest(characterId, questId);

        return { leveledUp };
    }
);

export const getItemsHandler = requestHandlerWrapper(
    async (payload: LambdaFunctionUrlPayload): Promise<Item[]> => {
        return items;
    }
);

export const disableRPGBackendHandler = async (): Promise<void> => {
    await disableRPGBackend();
};
