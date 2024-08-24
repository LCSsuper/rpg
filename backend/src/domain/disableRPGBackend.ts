import {
    LambdaClient,
    ListFunctionsCommand,
    PutFunctionConcurrencyCommand,
} from "@aws-sdk/client-lambda";

export const disableRPGBackend = async (): Promise<void> => {
    const client = new LambdaClient();

    const functions = await client.send(new ListFunctionsCommand({}));

    for (const func of functions.Functions || []) {
        if (func.FunctionName?.startsWith("RPG")) {
            await client.send(
                new PutFunctionConcurrencyCommand({
                    FunctionName: func.FunctionName,
                    ReservedConcurrentExecutions: 0,
                })
            );
        }
    }
};
