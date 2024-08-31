import { Box, Transition } from "@mantine/core";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Loading } from "./Loading";
import { Error } from "./Error";
import { ReactElement } from "react";

export const FetchedBox = <T extends unknown>({
    queryKey,
    queryFn,
    children,
    error,
    withinPortal,
}: {
    queryKey: string[];
    queryFn: () => Promise<T>;
    children: (data: T, refresh: () => void) => ReactElement;
    error: string;
    withinPortal?: boolean;
}) => {
    const { data, isFetching, isError, refetch } = useQuery({
        queryKey,
        queryFn,
        placeholderData: keepPreviousData,
    });

    return (
        <Box w="100%" pos="relative">
            <Loading loading={isFetching} withinPortal={withinPortal} />
            {isError && (
                <Error
                    message={error}
                    retry={() => refetch()}
                    withinPortal={withinPortal}
                />
            )}

            <Transition
                mounted={!!data}
                transition="fade-up"
                duration={400}
                timingFunction="ease"
            >
                {(styles) => (
                    <Box style={styles} h="100%">
                        {data ? children(data, refetch) : undefined}
                    </Box>
                )}
            </Transition>
        </Box>
    );
};
