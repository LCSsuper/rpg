import { Popover, ActionIcon, Text } from "@mantine/core";
import { IconHelpCircle } from "@tabler/icons-react";

export const InfoButton = ({ info }: { info: string }) => (
    <Popover width="10rem" position="left" withArrow shadow="md">
        <Popover.Target>
            <ActionIcon variant="subtle">
                <IconHelpCircle size="1.5rem" />
            </ActionIcon>
        </Popover.Target>
        <Popover.Dropdown>
            <Text size="xs">{info}</Text>
        </Popover.Dropdown>
    </Popover>
);
