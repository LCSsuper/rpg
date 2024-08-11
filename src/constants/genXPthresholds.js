const growthRate = 1.05847;
const startingXP = 10;
const levels = 100;
const increments = Array.from({ length: levels }, (_, i) =>
    Math.floor(startingXP * Math.pow(growthRate, i))
);

const thresholds = increments.reduce((acc, curr, i) => {
    acc.push((acc[i - 1] || 0) + curr);
    return acc;
}, []);

console.log(thresholds);
