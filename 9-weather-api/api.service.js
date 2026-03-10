import axios from 'axios';

const getWeather = async (city) => {
	const token = process.env.WEATHER_TOKEN;

	const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
		params: {
			q: city,
			appid: token,
			lang: 'en',
			units: 'metric'
		}
	});
	return data;
};

export { getWeather };