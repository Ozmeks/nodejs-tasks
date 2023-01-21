import { PerformanceObserver } from 'perf_hooks';
import { Worker } from 'worker_threads';

const performanceOserver = new PerformanceObserver((items) => {
  items.getEntries().forEach((entry) => {
    const { name, duration } = entry;
    console.log(`${name} : ${duration}`);
  });
});
performanceOserver.observe({ entryTypes: ['measure']});

const workerFunction = (array) => {
	return new Promise((resolve, reject) => {
		const worker = new Worker('./worker.js', { workerData: { array } });
		worker.on('message', (msg) => {
			resolve(msg);
		});
    worker.on('error', (err) => {
			reject(err);
		});
	});
};

const scoreCount = 8;
const length = 300000;

const arr = Array(length)
  .fill()
  .map(() => Math.floor(Math.random() * 100));

// 8 threads
performance.mark('start');
const part = Math.floor(length / scoreCount);
let i = 0;
let cnt = 0;
while (i <= length) {
  const arrayPart = arr.slice(i, i + part);
  cnt += await workerFunction(arrayPart);
  i += part;
};
console.log(cnt);

performance.mark('end');
performance.measure('divideBy3 8 threads', 'start', 'end');

// 1 thread
performance.mark('start 1 thread');
const calcNumbers = (array) => 
  array.filter((i) => i % 3 === 0).length;
console.log(calcNumbers(arr));

performance.mark('end 1 thread');
performance.measure('divideBy3 1 thread', 'start 1 thread', 'end 1 thread');