import { EventEmitter } from 'node:events';
const [, , num1, num2, operation] = process.argv;

const emmiter = new EventEmitter();
emmiter.on('add', (firstNum, secondNum) => console.log(firstNum + secondNum));
emmiter.on('subtract', (firstNum, secondNum) => console.log(firstNum - secondNum));
emmiter.on('multiply', (firstNum, secondNum) => console.log(firstNum * secondNum));
emmiter.on('divide', (firstNum, secondNum) => console.log(firstNum / secondNum));

emmiter.emit(operation, Number(num1), Number(num2));
