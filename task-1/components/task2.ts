import { createReadStream, createWriteStream } from 'fs';
import { csvToTxt, errorHandler, getPaths } from '@services/reverseString';

const { inputPath, outputPath } = getPaths(process.argv);

const writeStream = createWriteStream(outputPath).on('error', errorHandler);
const readStream = createReadStream(inputPath).on('error', errorHandler);

readStream.pipe(csvToTxt(inputPath)).pipe(writeStream)
