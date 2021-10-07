import csv from 'csvtojson';
import path from 'path';

const reverseString = (str: string) =>
  ([...str] as string[]).reduceRight((acc, cur) => acc + cur, '');

const csvToTxt = (inputPath: string) =>
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

const errorHandler = (err: Error) => console.log('Something wrong has happened', err);

const getPaths = ([, , inputName, outputName]: string[]) =>
  ({
    inputPath: path.join('csv', `${inputName}`),
    outputPath: path.join('csv', `${outputName}`)
  })

export { reverseString, csvToTxt, errorHandler, getPaths }
