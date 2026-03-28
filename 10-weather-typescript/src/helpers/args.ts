interface CLIArgs {
  h?: boolean;
  s?: string;
  d?: string;
  t?: string;
  l?: string;
}

const getArgs = (args: string[]): CLIArgs => {
	const res: { [key: string]: string | boolean } = {};
	const [executer, file, ...rest] = args;
	rest.forEach((value, index, array) => {
		if (value.charAt(0) == '-') {
			if (index == array.length - 1) {
				res[value.substring(1)] = true;
			} else if (array[index + 1].charAt(0) != '-') {
				res[value.substring(1)] = array[index + 1];
			} else {
				res[value.substring(1)] = true;
			}
		}
	});
	return res;
};

export { getArgs }