#!/usr/bin/env node
import { getArgs } from './helpers/args.js';
import { getWeather, getIcon } from './services/api.service.js';
import { printHelp, printSuccess, printError, printWeather } from './services/log.service.js';
import { saveKeyValue, getKeyValue, TOKEN_DICTIONARY } from './services/storage.service.js';

const saveToken = async (token) => {
  if (!token.length) {
    printError('No token passed');
    return;
  }
  try {
    await saveKeyValue(TOKEN_DICTIONARY.token, token);
    printSuccess('Token saved');
  } catch (e) {
    printError(e.message);
  }
};

const saveCities = async (cityStr) => {
  if (!cityStr.length) {
    printError('No cities passed');
    return;
  }
  try {
    const cities = cityStr.split(',');

    await saveKeyValue(TOKEN_DICTIONARY.cities, cities);
    printSuccess('Cities saved');
  } catch (e) {
    printError(e.message);
  }
};

const saveLang = async (lang) => {
  if (!lang.length) {
    printError('No language passed');
    return;
  }
  if (lang !== 'en' && lang !== 'ru') {
    printError('Invalid language specified. Languages available: en and ru');
    return;
  }
  try {
    await saveKeyValue(TOKEN_DICTIONARY.language, lang);
    printSuccess('Language saved');
  } catch (e) {
    printError(e.message);
  }
};

const getForecast = async () => {
  try {
    const token = process.env.TOKEN ?? (await getKeyValue(TOKEN_DICTIONARY.token));
    const cities = process.env.CITIES ?? (await getKeyValue(TOKEN_DICTIONARY.cities));
    const lang = process.env.LANGUAGE ?? (await getKeyValue(TOKEN_DICTIONARY.language)) ?? 'en';
    if (!token) {
      throw new Error('API token not set, set it with -t command [API_KEY]');
    }
    if (!cities) {
      throw new Error('Cities not set, set it with -c command CITIES]');
    }

    cities.forEach(async (city) => {
      const data = await getWeather(token, city, lang);
      const icon = getIcon(data.weather[0].icon);
      printWeather(data, icon, lang);
    });
  } catch (e) {
    if (e?.response?.status == 404) {
      printError('Invalid city');
    } else if (e?.response?.status == 401) {
      printError('Invalid token');
    } else {
      printError(e.message);
    }
  }
};

const initCLI = () => {
  const args = getArgs(process.argv);
  if (args.h) {
    return printHelp();
  }
  if (args.c) {
    return saveCities(args.c);
  }
  if (args.t) {
    return saveToken(args.t);
  }
  if (args.l) {
    return saveLang(args.l);
  }
  return getForecast();
};

initCLI();
