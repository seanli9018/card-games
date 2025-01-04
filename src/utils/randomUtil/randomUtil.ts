export const randomInArray = (arr: unknown[]) => {
  if (!(arr instanceof Array) || !arr.length) return null;

  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
};

export const randomHexColor = () => {
  return (
    "#" +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")
  );
};

export const randomRangeFromZero = (upperLimit: number = 100) => {
  if (typeof upperLimit !== "number") return;

  return Math.floor(Math.random() * upperLimit);
};
