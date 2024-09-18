import { useState } from "react";

import * as api from "../api";
import { CharacterBox } from "./CharacterBox";
import { FetchedBox } from "../Components/FetchedBox";
import { Character } from "../types";

export const CharacterPage = ({
    setTheme,
}: {
    setTheme: (color: string) => void;
}) => {
    const [variant, setVariant] = useState("skater");

    return (
        <FetchedBox<Character>
            queryKey={["getCharacter"]}
            queryFn={api.getCharacter}
            error="Could not load character"
        >
            {(character, refetch) => {
                if (character.variant !== variant) {
                    setVariant(character.variant);
                    setTheme(character.variant);
                }
                return (
                    <CharacterBox
                        character={character}
                        refetch={refetch}
                        setTheme={setTheme}
                    />
                );
            }}
        </FetchedBox>
    );
};
