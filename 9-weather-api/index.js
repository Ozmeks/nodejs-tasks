import express from 'express';
import { saveKeyValue, TOKEN_DICTIONARY } from '../8-weather-extended/services/storage.service.js';
import getForecast from './weather.js';

const port = 8000;
const app = express();

app.get('/weather', async (req, res) => {
  const data = await getForecast();
  res.send(JSON.stringify(data));
});

app.patch('/weather', async (req, res) => {
  const { cities } = req.query;
  if (cities) {
    const arrayOfCities = Array.isArray(cities) ? cities : [cities];
    await saveKeyValue(TOKEN_DICTIONARY.cities, arrayOfCities);
  }
  const { token } = req.query;
  if (token) {
    await saveKeyValue(TOKEN_DICTIONARY.token, token);
  }
  const { language } = req.query;
  if (language) {
    await saveKeyValue(TOKEN_DICTIONARY.language, language);
  }
  res.end();
});

app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).send(err.message);
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
