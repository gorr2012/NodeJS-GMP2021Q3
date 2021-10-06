import { stdin, stdout } from 'process';
import { createInterface } from 'readline';
import { reverseString } from '@services/reverseString';

const rl = createInterface({
  input: stdin,
  output: stdout
});

rl.on('line', (input) => rl.write(reverseString(input)));
