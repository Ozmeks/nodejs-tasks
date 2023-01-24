import { EventEmitter } from 'node:events';
import add from '../3-calc/add.js';
import multiply from '../3-calc/multiply.js';
import subtract from '../3-calc/subtract.js';
import divide from '../3-calc/divide.js';

const mapping = {
  add: add,
  subtract: subtract,
  multiply: multiply,
  divide: divide,
};

const [, , num1, num2, operation] = process.argv;

const emmiter = new EventEmitter();
emmiter.on(operation, (num1, num2) => {
  if (!mapping[operation]) {
    console.log('Operation does not exist. Avaliable: add, subtract, multiply, divide.');
    return;
  }
  const result = mapping[operation](Number(num1), Number(num2));
  console.log(result);
});

emmiter.emit(operation, num1, num2);
