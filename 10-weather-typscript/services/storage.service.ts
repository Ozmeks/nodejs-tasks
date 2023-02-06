import { homedir } from 'os';
import { join } from 'path';
import { promises } from 'fs';

const filePath = join(homedir(), 'weather-data.json');

const TOKEN_DICTIONARY = {
	token: 'token',
	cities: 'cities',
  language: 'language'
}

const saveKeyValue = async (key: string, value: string | string[]) => {
  interface IData {
    [key: string]: string | string[];
  };

  let data: IData = {};
	if (await isExist(filePath)) {
		const file = await promises.readFile(filePath);
		data = JSON.parse(file.toString('utf-8'));
	}
	data[key] = value;
	await promises.writeFile(filePath, JSON.stringify(data));
};

const getKeyValue = async (key: string) => {
	if (await isExist(filePath)) {
		const file = await promises.readFile(filePath);
    const data = JSON.parse(file.toString('utf-8'))
		return data[key];
	}
	return undefined;
};

const isExist = async (path: string) => {
	try {
		await promises.stat(path);
		return true;
	} catch (e) {
		return false;
	}
};

export { saveKeyValue, getKeyValue, TOKEN_DICTIONARY };