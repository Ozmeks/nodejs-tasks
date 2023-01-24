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
    console.log('The timer rang.');
  }, milliseconds);
};

export default timer;
