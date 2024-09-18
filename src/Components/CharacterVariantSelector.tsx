import { Grid, Card, Image } from "@mantine/core";
import { getCharacterImageSrc } from "../utils";

const variants = ["darkacademia", "cyberpunk", "skater"];

export const CharacterVariantSelector = ({
    variant,
    setVariant,
}: {
    variant: string;
    setVariant: (variant: string) => void;
}) => {
    return (
        <Grid w="20rem" gutter="md" style={{ position: "relative" }}>
            {variants.map((key) => {
                const selected = variant === key;
                const src = getCharacterImageSrc(key, 1);

                return (
                    <Grid.Col span={4} key={key}>
                        <Card
                            onClick={() => {
                                setVariant(key);
                            }}
                            shadow="xs"
                            padding="0"
                            withBorder
                            p="xs"
                            bg={
                                selected
                                    ? "var(--mantine-primary-color-light)"
                                    : undefined
                            }
                            styles={{
                                root: {
                                    borderColor: selected
                                        ? "var(--mantine-primary-color-6)"
                                        : undefined,
                                },
                            }}
                        >
                            <Image
                                src={src}
                                w="4.5rem"
                                style={{
                                    transform: "scale(3) translate(2%, 18%)",
                                }}
                            />
                        </Card>
                    </Grid.Col>
                );
            })}
        </Grid>
    );
};
