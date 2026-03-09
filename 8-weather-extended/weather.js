#!/usr/bin/env node
import { getArgs } from './helpers/args.js';
import { getWeatherForCities, getIcon } from './services/api.service.js';
import { printHelp, printSuccess, printError, printWeather } from './services/log.service.js';
import { saveKeyValue, TOKEN_DICTIONARY, getKeyValue } from './services/storage.service.js';
import { getMessage } from './helpers/locales.js';

const saveToken = async (token, m) => {
	if (!token.length) {
		printError(m.noToken);
		return;
	}
	try {
		await saveKeyValue(TOKEN_DICTIONARY.token, token);
		printSuccess(m.tokenSaved);
	} catch (e) {
		printError(e.message);
	}
}

const saveCity = async (city, m) => {
	if (!city.length) {
		printError(m.noCity);
		return;
	}
	try {
		const existing = await getKeyValue(TOKEN_DICTIONARY.city) ?? [];
    if (!existing.includes(city)) {
      await saveKeyValue(TOKEN_DICTIONARY.city, [...existing, city]);
    }
		printSuccess(m.citySaved);
	} catch (e) {
		printError(e.message);
	}
}

const deleteCity = async (city, m) => {
	if (!city.length) {
		printError(m.noCity);
		return;
	}
	try {
		const existing = await getKeyValue(TOKEN_DICTIONARY.city) ?? [];
    if (existing.includes(city)) {
      const newArray = existing.filter((el) => el !== city);
      await saveKeyValue(TOKEN_DICTIONARY.city, newArray);
    }
		printSuccess(m.cityDeleted);
	} catch (e) {
		printError(e.message);
	}
}

const saveLanguage = async (language, m) => {
	if (!language.length) {
		printError(m.noLanguage);
		return;
	}
  try {
		await saveKeyValue(TOKEN_DICTIONARY.language, language);
    const newM = getMessage(language);
		printSuccess(newM.languageSaved);
	} catch (e) {
		printError(e.message);
	}
};

const getForecast = async (m) => {
	try {
		const cities = await getKeyValue(TOKEN_DICTIONARY.city) ?? [];
    if (!cities.length) {
      printError(m.noCity);
      return;
    }

    const language = await getKeyValue(TOKEN_DICTIONARY.language) ?? 'en';
    const results = await getWeatherForCities(cities, language);
    results.forEach(weather => {
      printWeather(weather, getIcon(weather.weather[0].icon), m);
    });
	} catch (e) {
		if (e?.response?.status == 404) {
			printError(m.wrongCity);
		} else if (e?.response?.status == 401) {
      printError(m.wrongToken);
		} else {
			printError(e.message);
		}
	}
}

const initCLI = async () => {
	const args = getArgs(process.argv);

  const lang = await getKeyValue(TOKEN_DICTIONARY.language) ?? 'en';
  const m = getMessage(lang);

	if (args.h) {
		return printHelp(m);
	}
	if (args.s) {
		return saveCity(args.s, m);
	}
  if (args.d) {
		return deleteCity(args.d, m);
	}
	if (args.t) {
		return saveToken(args.t, m);
	}
  if (args.l) {
		return saveLanguage(args.l, m);
	}
	return getForecast(m);
};

initCLI();