import { stdin, stdout } from 'process';
import { createInterface } from 'readline';
import { reverseStringAndWords } from '@services/reverseStringAndWords';
// import nodemon from 'nodemon';

const rl = createInterface({
  input: stdin,
  output: stdout
});

rl.write(`Type your magic string \n`);

rl.on('line', (input) => console.log(reverseStringAndWords(input)));
