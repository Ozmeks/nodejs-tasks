import chalk from 'chalk';
import dedent from 'dedent-js';

const printError = (error: string) => {
	console.log(chalk.bgRed(' ERROR ') + ' ' + error);
};

const printSuccess = (message: string) => {
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

interface IMappingToLang {
  [key: string]: {
    weatherInfo(city: string): string,
    tempInfo(temp:string, feels_like: string): string,
    humidityInfo(humidity: string): string,
  };
};

const mappingToLang: IMappingToLang = {
  'en': 
    { weatherInfo: (city) => `Weather in ${city}:`,
      tempInfo: (temp, feels_like) => `The temperature is ${temp} C. It feels like ${feels_like} C.`,
      humidityInfo: (humidity) => `Humidity is ${humidity}%.`,
    },
    'ru': 
    { weatherInfo: (city) => `Погода в городе ${city}:`,
      tempInfo: (temp, feels_like) => `Температура ${temp} C. Ощущается как ${feels_like} C.`,
      humidityInfo: (humidity) => `Влажность ${humidity}%.`,
    },
};

interface IData {
  name: string,
  main: {
    temp: string,
    feels_like: string,
    humidity: string
  },
  weather: [{ description: string }]
}

const printWeather = (data: IData, icon: string, lang: string) => {
  const { main, weather } = data;
  const [{ description }] = weather;
  const { temp, feels_like, humidity } = main;
  
  const info = `${chalk.bgMagenta(' WEATHER ')}`;

  console.log(dedent`${info} ${mappingToLang[lang].weatherInfo(data.name)}
  ${icon} ${description}
  ${mappingToLang[lang].tempInfo(temp, feels_like)}
  ${mappingToLang[lang].humidityInfo(humidity)}
  `);
};

export { printError, printSuccess, printHelp, printWeather };