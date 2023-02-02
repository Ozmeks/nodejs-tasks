import notifier from 'node-notifier';

const timer = (time) => {
  const indexMappingToMillisecs = {
    0: 1000, // Seconds -> Milliseconds
    1: 60000, // Minutes -> Milliseconds
    2: 3600000 // Hours -> Milliseconds
  };

  const milliseconds = time.split(' ')
    .reverse()
    .map((item) => Number(item.slice(0, -1)))
    .reduce((acc, item, index) => acc + item * indexMappingToMillisecs[index], 0);

  setTimeout(() => {
    notifier.notify({
      title: 'My timer',
      message: 'The timer rang',
      sound: true
    });
  }, milliseconds);
};

export default timer;
