import chalk from 'chalk';
import dedent from 'dedent-js';

const printError = (error) => {
	console.log(chalk.bgRed(' ERROR ') + ' ' + error);
};

const printSuccess = (message) => {
	console.log(chalk.bgGreen(' SUCCESS ') + ' ' + message);
};

const printHelp = (m) => {
	console.log(
		dedent`${chalk.bgCyan(' HELP ')}
		${m.help}
		`
	);
};

const printWeather = (res, icon, m) => {
	console.log(
    dedent`${chalk.bgYellow(' WEATHER ')} ${m.weatherTitle} ${res.name}
    ${icon}  ${res.weather[0].description}
    ${m.temperature}: ${res.main.temp} (${m.feelsLike} ${res.main.feels_like})
    ${m.humidity}: ${res.main.humidity}%
    ${m.windSpeed}: ${res.wind.speed}
		`
	);
};

export { printError, printSuccess, printHelp, printWeather };