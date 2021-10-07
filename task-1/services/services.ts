import csv from 'csvtojson';
import path from 'path';

export const reverseString = (str: string) =>
  ([...str] as string[]).reduceRight((acc, cur) => acc + cur, '');

export const csvToTxt = (inputPath: string) =>
  csv({
    delimiter: ';',
    headers: ['book', 'author', 'amount', 'price']
  })
    .fromFile(inputPath)
    .subscribe(txtLine => {
      txtLine;
      delete txtLine['amount'];
    })
    .on('error', errorHandler);

export const errorHandler = (err: Error) => console.log('Something wrong has happened', err);

export const getPaths = ([, , inputName, outputName]: string[]) =>
({
  inputPath: path.join('csv', `${inputName}`),
  outputPath: path.join('csv', `${outputName}`)
})
