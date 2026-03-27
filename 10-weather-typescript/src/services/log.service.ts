import chalk from 'chalk';
import dedent from 'dedent-js';
import { IMessage } from '../helpers/locales';

const printError = (error: string) => {
	console.log(chalk.bgRed(' ERROR ') + ' ' + error);
};

const printSuccess = (message: string) => {
	console.log(chalk.bgGreen(' SUCCESS ') + ' ' + message);
};

const printHelp = (m: IMessage) => {
	console.log(
		dedent`${chalk.bgCyan(' HELP ')}
		${m.help}
		`
	);
};

interface IResponse {
  name: string;
  weather: { description: string }[];
  main: { temp: number; feels_like: number; humidity: number };
  wind: { speed: number };
}

const printWeather = (res: IResponse, icon: string | undefined, m: IMessage) => {
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