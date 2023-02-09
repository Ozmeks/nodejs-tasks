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

const mappingToLang = {
  en: {
    weatherInfo: (city) => `Weather in ${city}:`,
    tempInfo: (temp, feels_like) => `The temperature is ${temp} C. It feels like ${feels_like} C.`,
    humidityInfo: (humidity) => `Humidity is ${humidity}%.`,
  },
  ru: {
    weatherInfo: (city) => `Погода в городе ${city}:`,
    tempInfo: (temp, feels_like) => `Температура ${temp} C. Ощущается как ${feels_like} C.`,
    humidityInfo: (humidity) => `Влажность ${humidity}%.`,
  },
};

const printWeather = (data, icon, lang) => {
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
