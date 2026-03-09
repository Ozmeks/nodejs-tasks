#!/usr/bin/env node
import { getArgs } from './helpers/args.js';
import { getWeather, getIcon } from './services/api.service.js';
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
		await saveKeyValue(TOKEN_DICTIONARY.city, city);
		printSuccess(m.citySaved);
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
		const city = process.env.CITY ?? await getKeyValue(TOKEN_DICTIONARY.city);
    const language = await getKeyValue(TOKEN_DICTIONARY.language) ?? 'en';
		const weather = await getWeather(city, language);
		printWeather(weather, getIcon(weather.weather[0].icon), m);
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
	if (args.t) {
		return saveToken(args.t, m);
	}
  if (args.l) {
		return saveLanguage(args.l, m);
	}
	return getForecast(m);
};

initCLI();