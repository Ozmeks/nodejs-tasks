import notifier from 'node-notifier';

const timer = (time) => {
  const timeMapping = {
    0: 1000,
    1: 60000,
    2: 3600000
  };

  const milliseconds = time.split(' ')
    .reverse()
    .map((item) => Number(item.slice(0, -1)))
    .reduce((acc, item, index) => acc + item * timeMapping[index], 0);

  setTimeout(() => {
    notifier.notify({
      title: 'My timer',
      message: 'The timer rang',
      sound: true
    });
  }, milliseconds);
};

export default timer;
