import { ItemType } from "../types";

const set = require("./IconSet.png");

const positions: Record<string, [number, number]> = {
    pendant: [2, 11],
    glove: [14, 12],
    vial: [4, 9],
    shell: [11, 1],
    cloak: [10, 12],
    armor: [9, 12],
    elixir: [3, 9],
    band: [5, 8],
    amulet: [3, 11],
    hourglass: [12, 7],
    apple: [8, 4],
    satchel: [1, 7],
    seed: [10, 4],
    charm: [11, 2],
    scarf: [6, 11],
    blanket: [11, 12],
    coin: [10, 1],
    ledger: [13, 9],
    box: [3, 7],
    crystal: [6, 10],
    purse: [9, 13],
    ring: [1, 11],
    pen: [6, 5],
    sands: [0, 1],
    stone: [1, 1],
    herb: [5, 9],
    quill: [9, 2],
    ink: [2, 9],
    canvas: [12, 9],
    spark: [9, 10],
    scroll: [14, 9],
    orb: [4, 1],
    tome: [10, 9],
    hammer: [15, 7],
    lute: [4, 8],
    book: [11, 9],
    harp: [3, 8],
    baton: [11, 14],
    string: [2, 2],
    muse: [15, 2],
    bracelet: [0, 11],
    mirror: [14, 7],
    toolkit: [2, 7],
    oil: [2, 9],
    blueprint: [1, 8],
    gauntlet: [15, 12],
    breaker: [4, 11],
    boots: [13, 12],
    shield: [0, 12],
    potion: [0, 9],
};

export const ItemIcon = ({
    name,
    scale,
}: {
    name: ItemType;
    scale?: number;
}) => {
    const position = positions[name];

    if (!position) {
        return null;
    }

    return (
        <div
            style={{
                backgroundImage: `url(${set})`,
                backgroundPosition: `${position[0] * -32}px ${
                    position[1] * 32
                }px`,
                height: "32px",
                width: "32px",
                transform: `scale(${scale || 1.3})`,
            }}
        />
    );
};
