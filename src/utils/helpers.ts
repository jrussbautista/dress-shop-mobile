export const getFirstLetter = (word: string): string => {
  return word.charAt(0);
};

export const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString('en-US');
};
