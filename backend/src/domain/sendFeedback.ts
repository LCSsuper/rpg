import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { getCharacter } from "./getCharacter";

export const sendFeedback = async (
    characterId: string,
    feedback: string
): Promise<void> => {
    const client = new SESClient();

    const character = await getCharacter(characterId);

    await client.send(
        new SendEmailCommand({
            Destination: {
                ToAddresses: ["lcssuper@gmail.com"],
            },
            Message: {
                Body: {
                    Text: {
                        Data: `User:\n${
                            character?.name || "Unknown user"
                        }\n${characterId}\n\nFeedback:\n${feedback}`,
                    },
                },
                Subject: {
                    Data: "New feedback for RPG app!",
                },
            },
            Source: "lcssuper@gmail.com",
        })
    );
};
