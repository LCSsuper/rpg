import * as api from "../api";
import { CharacterBox } from "./CharacterBox";
import { FetchedBox } from "../Components/FetchedBox";
import { Character } from "../types";

export const CharacterPage = ({
    colorTheme,
}: {
    colorTheme: "light" | "dark";
}) => {
    return (
        <FetchedBox<Character>
            queryKey={["getCharacter"]}
            queryFn={api.getCharacter}
            error="Could not load character"
        >
            {(character) => (
                <CharacterBox character={character} colorTheme={colorTheme} />
            )}
        </FetchedBox>
    );
};
