import { Box, Text } from "@mantine/core";
import { useEffect, useState } from "react";

export const Cooldown = ({
    remainingSeconds,
    onComplete,
}: {
    remainingSeconds: number;
    onComplete: () => void;
}) => {
    const [time, setTime] = useState(remainingSeconds);

    useEffect(() => {
        let timer = setInterval(() => {
            setTime((time) => {
                if (time === 0) {
                    clearInterval(timer);
                    return 0;
                } else return time - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [onComplete]);

    useEffect(() => {
        if (time === 0) {
            onComplete();
        }
    }, [time, onComplete]);

    const hours = Math.floor(time / 60 / 60);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return (
        <Box>
            <Text c="dimmed" fw="bold">
                {`${hours}`.padStart(2, "0")}:{`${minutes}`.padStart(2, "0")}:
                {`${seconds}`.padStart(2, "0")}
            </Text>
        </Box>
    );
};
