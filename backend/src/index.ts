import { authorize } from "./domain/authorize";
import { disableRPGBackend } from "./domain/disableRPGBackend";
import { getCharacter } from "./domain/getCharacter";

type LambdaFunctionUrlPayload = {
    headers?: Record<string, string>;
    queryStringParameters?: Record<string, string>;
    body?: string;
};

export const getCharacterHandler = async (
    payload: LambdaFunctionUrlPayload
): Promise<{
    statusCode: number;
    body: string;
}> => {
    try {
        await authorize(payload.headers?.authorization);

        const characterId = payload.queryStringParameters?.characterId;

        if (!characterId) {
            throw new Error("CharacterId is required");
        }

        const character = await getCharacter(characterId);

        return {
            statusCode: 200,
            body: JSON.stringify(character),
        };
    } catch (e) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: (e as Error).message }),
        };
    }
};

export const disableRPGBackendHandler = async (): Promise<void> => {
    await disableRPGBackend();
};
