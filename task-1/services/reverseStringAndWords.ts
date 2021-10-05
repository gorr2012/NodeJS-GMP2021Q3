const reverseWord = (str: string, separator: string) => str.split(separator).reverse();

export const reverseStringAndWords = (str: string) =>
  reverseWord(str, ' ').map(word => reverseWord(word, '').join('')).join(' ')
