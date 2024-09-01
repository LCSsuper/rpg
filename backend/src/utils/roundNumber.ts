export const roundNumber = (number: number, decimals: number = 1): number =>
    Number(
        `${Math.round(
            parseFloat(`${Math.abs(number)}e${decimals}`)
        )}e-${decimals}`
    );
