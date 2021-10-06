export const reverseString = (str: string) =>
  ([...str] as string[]).reduceRight((acc, cur) => acc + cur, '')
