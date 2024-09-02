import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

export const sendFeedback = async (
    characterId: string,
    feedback: string
): Promise<void> => {
    const client = new SESClient();

    await client.send(
        new SendEmailCommand({
            Destination: {
                ToAddresses: ["lcssuper@gmail.com"],
            },
            Message: {
                Body: {
                    Text: {
                        Data: `CharacterId:\n${characterId}\n\nFeedback:\n${feedback}`,
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
