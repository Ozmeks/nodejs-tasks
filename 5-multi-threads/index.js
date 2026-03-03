import { performance, PerformanceObserver } from "perf_hooks";
import { Worker } from "worker_threads";

// Perfprmance observer
const performanceObserver = new PerformanceObserver((items) => {
  items.getEntries().forEach((entry) => {
    console.log(`${entry.name}: ${entry.duration}`);
  });
});
performanceObserver.observe({ entryTypes: ["measure"] });

// Worker
const workerFunction = (array) => {
  return new Promise((resolve, reject) => {
    const worker = new Worker("./worker.js", {
      workerData: { array },
    });
    worker.on("message", (msg) => {
      resolve(msg);
    });
  });
};

// Initial array
const length = 300000;
const arr = Array(length)
  .fill()
  .map(() => Math.floor(Math.random() * 100));

// One thread check performance
performance.mark("start");
const oneThreadResult = arr.filter((i) => i % 3 === 0).length;
console.log(`One thread result: ${oneThreadResult}`);
performance.mark("end");
performance.measure("One thread", "start", "end");

// Workers check performance
const scoreCount = 8;
const part = arr.length / scoreCount;
const promises = [];
let i = 0;
while (i < length) {
  const arrayPart = arr.slice(i, i + part);
  promises.push(workerFunction(arrayPart));
  i += part;
}

performance.mark("start worker");
const multiThreadResult = await Promise.all(promises).then((calcNumbers) => calcNumbers.reduce((acc, item) => acc + item), 0);
performance.mark("end worker");
console.log(`Multi thread result: ${multiThreadResult}`)
performance.measure("workers", "start worker", "end worker");
