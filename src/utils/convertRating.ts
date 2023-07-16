export const convertRating = (value: number) => {
    return Number(value) % 1 === 0 ? value.toFixed(1) : value.toString();
};
