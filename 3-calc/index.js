import add from './add.js';
import multiply from './multiply.js';
import subtract from './subtract.js';
import divide from './divide.js';

const mapping = {
  add: add,
  subtract: subtract,
  multiply: multiply,
  divide: divide,
};

const calc = (num1, num2, operation) => {
  if (!mapping[operation]) {
    console.log('Operation does not exist. Avaliable: add, subtract, multiply, divide.');
    return;
  }
  const result = mapping[operation](Number(num1), Number(num2));
  console.log(result);
};

const [, , num1, num2, operation] = process.argv;
calc(num1, num2, operation);
