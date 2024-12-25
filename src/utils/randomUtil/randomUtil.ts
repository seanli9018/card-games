export const randomInArray = (arr: unknown[]) => {
  if (!(arr instanceof Array) || !arr.length) return null;

  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
};
