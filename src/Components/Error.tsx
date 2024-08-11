import { Affix, Box, Button, Center, Flex, Title } from "@mantine/core";

const ErrorContent = ({
    message,
    retry,
    withinPortal,
}: {
    message: string;
    retry: () => void;
    withinPortal?: boolean;
}) => {
    return (
        <Center
            h="100%"
            style={{ backdropFilter: withinPortal ? undefined : "blur(3px)" }}
        >
            <Flex direction="column" align="center" justify="center" gap="sm">
                <Title order={withinPortal ? 4 : 3} c="dimmed">
                    {message}
                </Title>
                <Button onClick={() => retry()}>Try again</Button>
            </Flex>
        </Center>
    );
};

export const Error = ({
    message,
    retry,
    withinPortal,
}: {
    message: string;
    retry: () => void;
    withinPortal?: boolean;
}) => {
    return withinPortal ? (
        <Box h="10rem">
            <ErrorContent message={message} retry={retry} withinPortal />
        </Box>
    ) : (
        <Affix
            position={{
                top: 0,
                left: 0,
                right: 0,
                bottom: "5rem",
            }}
        >
            <ErrorContent message={message} retry={retry} />
        </Affix>
    );
};
