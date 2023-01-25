import chalk from 'chalk';
import dedent from 'dedent-js';

const printError = (error) => {
	console.log(chalk.bgRed(' ERROR ') + ' ' + error);
};

const printSuccess = (message) => {
	console.log(chalk.bgGreen(' SUCCESS ') + ' ' + message);
};

const printHelp = () => {
	console.log(
		dedent`${chalk.bgCyan(' HELP ')}
		Show weather without parameters
		-h help
    -t [TOKEN] save token
    -c [CITIES] save array of cities. Example: london,berlin
    -l [LANGUAGE] save language settings (default en)
		`
	);
};

const printWeather = (data, icon, lang) => {
  const { main, weather } = data;
  const [{ description }] = weather;
  const { temp, feels_like, humidity } = main;
  
  const info = `${chalk.bgMagenta(' WEATHER ')}`;
  if (lang === 'en') {
    console.log(dedent`${info} Weather in ${data.name}:
    ${icon} ${description}
    The temperature is ${temp} C. It feels like ${feels_like} C.
    Humidity is ${humidity}%.`);
  } else {
    console.log(dedent`${info} Погода в городе ${data.name}:
    ${icon} ${description}
    Температура ${temp} C. Ощущается как ${feels_like} C.
    Влажность ${humidity}%.`);
  }
};

export { printError, printSuccess, printHelp, printWeather };