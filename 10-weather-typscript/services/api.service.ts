import axios from 'axios';

interface IMappingToEmoji {
  [key: string]: string
};

const mappingToEmoji: IMappingToEmoji = {
  '01': '☀️',
  '02': '🌤️',
  '03': '☁️',
  '04': '☁️',
  '09': '🌧️',
  '10': '🌦️',
  '11': '🌩️',
  '13': '❄️',
  '50': '🌫️',
};

const urlApi = 'https://api.openweathermap.org/data/2.5/weather';

const getIcon = (icon: string) => {
	const emoji = mappingToEmoji[icon.slice(0, -1)];
  return (emoji) ?? '';
};

const getWeather = async (token: string, city: string, lang: string) => {
	const { data } = await axios.get(urlApi, {
		params: {
			q: city,
			appid: token,
			lang: lang,
			units: 'metric'
		}
	});
	return data;
};

export { getWeather, getIcon };