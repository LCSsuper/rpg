import * as superagent from "superagent";

import { Character, CompleteQuestResponse, Item, Quest } from "../types";

const loadCharacterIdAndToken = () => {
    const characterId = window.localStorage.getItem("characterId");
    const token = window.localStorage.getItem("token");

    if (!characterId || !token) {
        throw new Error("Character ID or token not found");
    }

    return { characterId, token };
};

export const createCharacter = async (
    token: string,
    name: string
): Promise<{ characterId: string }> => {
    const { body } = await superagent
        .post(
            "https://qxlazojoawnbwjr22xq3u6ehw40yzoga.lambda-url.eu-west-1.on.aws/"
        )
        .set("authorization", token)
        .send({ name });

    return body;
};

export const characterExists = async (
    characterId: string,
    token: string
): Promise<void> => {
    await superagent
        .get(
            "https://b3qstxrrcmqpdz26upmadkri3e0rswkz.lambda-url.eu-west-1.on.aws/"
        )
        .set("authorization", token)
        .query({ characterId });
};

export const getCharacter = async (): Promise<Character> => {
    const { characterId, token } = loadCharacterIdAndToken();
    const { body } = await superagent
        .get(
            "https://b3qstxrrcmqpdz26upmadkri3e0rswkz.lambda-url.eu-west-1.on.aws/"
        )
        .set("authorization", token)
        .query({ characterId });

    return body;
};

export const getQuests = async (skill?: string): Promise<Quest[]> => {
    const { characterId, token } = loadCharacterIdAndToken();
    const { body } = await superagent
        .get(
            "https://hdbndhuhfwr37xpprn6qbouv2e0mebcr.lambda-url.eu-west-1.on.aws/"
        )
        .set("authorization", token)
        .query({ skill, characterId });

    return body;
};

export const createQuest = async (quest: Quest): Promise<void> => {
    const { characterId, token } = loadCharacterIdAndToken();
    await superagent
        .post(
            "https://4uiuizl5lc7vjeqsp44gyp7hqi0eiqme.lambda-url.eu-west-1.on.aws/"
        )
        .set("authorization", token)
        .query({ characterId })
        .send(quest);
};

export const updateQuest = async (quest: Quest): Promise<void> => {
    const { characterId, token } = loadCharacterIdAndToken();
    await superagent
        .post(
            "https://s2ndcoqawucl5f677aoakatfny0higlm.lambda-url.eu-west-1.on.aws/"
        )
        .set("authorization", token)
        .query({ characterId })
        .send(quest);
};

export const deleteQuest = async (questId: string): Promise<void> => {
    const { characterId, token } = loadCharacterIdAndToken();
    await superagent
        .get(
            "https://7vuaeb3z4zc6fvqufcebfkx2uu0wwrgr.lambda-url.eu-west-1.on.aws/"
        )
        .set("authorization", token)
        .query({ questId, characterId });
};

export const completeQuest = async (
    questId: string
): Promise<CompleteQuestResponse> => {
    const { characterId, token } = loadCharacterIdAndToken();
    const { body } = await superagent
        .get(
            "https://gdzr4nunpckgjnm2jmwf7oljiy0cajpj.lambda-url.eu-west-1.on.aws/"
        )
        .set("authorization", token)
        .query({ questId, characterId });

    return body;
};

export const getItems = async (): Promise<{ gold: number; items: Item[] }> => {
    const { token, characterId } = loadCharacterIdAndToken();
    const { body } = await superagent
        .get(
            "https://nuiucso2z4wiakwfx65y5l5nsq0fnkeq.lambda-url.eu-west-1.on.aws/"
        )
        .set("authorization", token)
        .query({ characterId });

    return body;
};

export const buyItem = async (itemId: string): Promise<void> => {
    const { token, characterId } = loadCharacterIdAndToken();
    await superagent
        .get(
            "https://6v4bhq3pznfbkturp2xhmml3s40blnqn.lambda-url.eu-west-1.on.aws/"
        )
        .set("authorization", token)
        .query({ characterId, itemId, action: "buy" });
};

export const sellItem = async (itemId: string): Promise<void> => {
    const { token, characterId } = loadCharacterIdAndToken();
    await superagent
        .get(
            "https://6v4bhq3pznfbkturp2xhmml3s40blnqn.lambda-url.eu-west-1.on.aws/"
        )
        .set("authorization", token)
        .query({ characterId, itemId, action: "sell" });
};

export const sendFeedback = async (feedback: string): Promise<void> => {
    const { token, characterId } = loadCharacterIdAndToken();
    await superagent
        .post(
            "https://24t46srbkxhisbmqzfrjluxjya0bvsep.lambda-url.eu-west-1.on.aws/"
        )
        .set("authorization", token)
        .query({ characterId })
        .send({ feedback });
};
