import { disableRPGBackend } from "./domain/disableRPGBackend";

export const getCharacterHandler = async (): Promise<{
    statusCode: number;
    body: string;
}> => {
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: "Hello from Lambda!",
        }),
    };
};

export const disableRPGBackendHandler = async (): Promise<void> => {
    await disableRPGBackend();
};
