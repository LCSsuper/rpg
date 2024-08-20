const growthRate = 1.03825;
const startingXP = 5;
const levels = 98;
const increments = Array.from({ length: levels }, (_, i) =>
    Math.floor(startingXP * Math.pow(growthRate, i))
);

const thresholds = increments.reduce((acc, curr, i) => {
    acc.push((acc[i - 1] || 0) + curr);
    return acc;
}, []);

console.log(thresholds);
