import axios  from 'axios';
import { getKeyValue, TOKEN_DICTIONARY } from '../8-weather-extended/services/storage.service.js';

const getForecast = async () => {
  const token = await getKeyValue(TOKEN_DICTIONARY.token);
  const cities = await getKeyValue(TOKEN_DICTIONARY.cities);
  const lang = await getKeyValue(TOKEN_DICTIONARY.language) ?? 'en';
  if (!token) {
    throw new Error('API token not set');
  }
  if (!cities) {
    throw new Error('Cities not set');
  }
  const promises = cities.map((city) => axios
    .get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        q: city,
        appid: token,
        lang: lang,
        units: 'metric'
      }})
    .then(({ data }) => {
      const { main, weather, name } = data;
      const [{ description }] = weather;
      const { temp, feels_like, humidity } = main;
      return { name, description, temp, feels_like, humidity };
    }));
  return await Promise.all(promises);
};

export default getForecast;
