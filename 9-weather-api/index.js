import 'dotenv/config';
import express from 'express';
import { getWeather } from './api.service.js';

const app = express();

app.get('/', async (req, res) => {
  try {
    const city = req.query.city;
    if (!city) {
      return res.status(400).json({ error: 'City is required' });
    }

    const forecast = await getWeather(city);
    
    res.json({
      city: forecast.name,
      temperature: forecast.main.temp,
      feelsLike: forecast.main.feels_like,
      humidity: forecast.main.humidity,
      windSpeed: forecast.wind.speed,
      description: forecast.weather[0].description,
      icon: forecast.weather[0].icon,
    });
  } catch (e) {
    if (e?.response?.status === 404) {
      res.status(404).json({ error: 'City not found' });
    } else if (e?.response?.status === 401) {
      res.status(401).json({ error: 'Invalid token' });
    } else {
      res.status(500).json({ error: e.message });
    }
  }
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
});
