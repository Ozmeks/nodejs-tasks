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
    console.log('The timer rang.');
  }, milliseconds);
};

export default timer;
