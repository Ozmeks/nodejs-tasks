import { parentPort, workerData } from 'worker_threads';

const calcNumbers = ({ array }) => 
  array.filter((i) => i % 3 === 0).length;

parentPort.postMessage(calcNumbers(workerData));
