import { authorize } from "./domain/authorize";
import { completeQuest } from "./domain/completeQuest";
import { createCharacterAndInventory } from "./domain/createCharacterAndInventory";
import { createQuest } from "./domain/createQuest";
import { deleteQuest } from "./domain/deleteQuest";
import { disableRPGBackend } from "./domain/disableRPGBackend";
import { getItems } from "./domain/getItems";
import { getQuests } from "./domain/getQuests";
import { updateQuest } from "./domain/updateQuest";
import { buyOrSellItem } from "./domain/buyOrSellItem";
import { Character, CompleteQuestResponse, Item, Quest } from "./types";
import { getCharacter } from "./domain/getCharacter";
import { sendFeedback } from "./domain/sendFeedback";

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
    ): Promise<CompleteQuestResponse> => {
        const characterId = payload.queryStringParameters?.characterId;

        if (!characterId) {
            throw new Error("CharacterId is required");
        }

        const questId = payload.queryStringParameters?.questId;

        if (!questId) {
            throw new Error("QuestId is required");
        }

        return completeQuest(characterId, questId);
    }
);

export const getItemsHandler = requestHandlerWrapper(
    async (
        payload: LambdaFunctionUrlPayload
    ): Promise<{ gold: number; items: Item[] }> => {
        const characterId = payload.queryStringParameters?.characterId;

        if (!characterId) {
            throw new Error("CharacterId is required");
        }

        return getItems(characterId);
    }
);

export const buyOrSellItemHandler = requestHandlerWrapper(
    async (payload: LambdaFunctionUrlPayload): Promise<void> => {
        const characterId = payload.queryStringParameters?.characterId;

        if (!characterId) {
            throw new Error("CharacterId is required");
        }

        const itemId = payload.queryStringParameters?.itemId;
        const action = payload.queryStringParameters?.action;

        if (!itemId || !action) {
            throw new Error("ItemId and action are required");
        }

        if (action !== "buy" && action !== "sell") {
            throw new Error('Action must be "buy" or "sell"');
        }

        await buyOrSellItem(characterId, itemId, action);
    }
);

export const sendFeedbackHandler = requestHandlerWrapper(
    async (payload: LambdaFunctionUrlPayload): Promise<void> => {
        const characterId = payload.queryStringParameters?.characterId;

        if (!characterId) {
            throw new Error("CharacterId is required");
        }

        const feedback = JSON.parse(payload.body || "{}").feedback;

        if (!feedback) {
            throw new Error("No feedback provided");
        }

        await sendFeedback(characterId, feedback);
    }
);

export const disableRPGBackendHandler = async (): Promise<void> => {
    await disableRPGBackend();
};
