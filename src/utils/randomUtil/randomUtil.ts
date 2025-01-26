export const randomInArray = (arr: unknown[]) => {
  if (!(arr instanceof Array) || !arr.length) return null;

  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
};

export const randomHexColor = () => {
  return (
    '#' +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0')
  );
};

export const randomRangeFromZero = (upperLimit: number = 100) => {
  if (typeof upperLimit !== 'number') return;

  return Math.floor(Math.random() * upperLimit);
};

export const fisherYatesRandomIndex = (index: number) => {
  if (typeof index !== 'number') return;
  return Math.floor(Math.random() * (index + 1));
};

/**
 *
 * @param arr : with more than 1 items.
 * @returns A new array with Fisher-Yates (Random) Shuffle
 */
export const fisherYatesShuffleArray = <T>(arr: T[]): T[] => {
  // Only shuffle arr with more than 1 item.
  if (!arr || arr.length <= 1) return arr;

  const copiedArr = [...arr];
  for (let i = copiedArr.length - 1; i > 0; i--) {
    // Generate a random index between 0 and i
    const randomIdx = fisherYatesRandomIndex(i);

    // Swap the elements
    [copiedArr[i], copiedArr[randomIdx!]] = [
      copiedArr[randomIdx!],
      copiedArr[i],
    ];
  }
  return copiedArr;
};

/**
 *
 * @param arr : with more than 1 items.
 * @returns A new array with One-Liner (Random) Shuffle
 */
export const oneLinerShuffleArray = <T>(arr: T[]): T[] => {
  // Only shuffle arr with more than 1 item.
  if (!arr || arr.length <= 1) return arr;

  const copiedArr = [...arr];
  const randomArr = copiedArr.sort(() => Math.random() - 0.5);
  return randomArr;
};
