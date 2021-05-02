export const geometricDistribution = (p: number, max: number): number => {
    if (p < 0 || 1 <= p) {
        throw new Error(`Impossible probability ${p} passed into geometricDistribution()`);
    }

    let i: number;

    for (i = 0; i < max; ++i) {
        if (Math.random() <= p) return i;
    }

    return i;
}
