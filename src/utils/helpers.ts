export const getFirstLetter = (word: string): string => {
  return word.charAt(0);
};

export const formatPrice = (price: number) => {
  return `P${price}`;
};

export const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString('en-US');
};
