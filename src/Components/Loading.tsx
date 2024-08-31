import { Transition, Affix, Center, Loader, Overlay } from "@mantine/core";

const LoadingContent = () => {
    return (
        <Center h="100%" style={{ backdropFilter: "blur(3px)" }}>
            <Loader type="dots" />
        </Center>
    );
};

export const Loading = ({
    loading,
    withinPortal,
}: {
    loading: boolean;
    withinPortal?: boolean;
}) => {
    return (
        <Transition
            mounted={loading}
            transition="fade"
            duration={400}
            timingFunction="ease"
        >
            {(styles) => (
                <>
                    {withinPortal ? (
                        <Overlay style={styles} h="10rem" bg="none">
                            <LoadingContent />
                        </Overlay>
                    ) : (
                        <Affix
                            position={{
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: "5rem",
                            }}
                            style={styles}
                        >
                            <LoadingContent />
                        </Affix>
                    )}
                </>
            )}
        </Transition>
    );
};
