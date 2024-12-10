import type { PageLoad } from './$types';

const weatherCodes: { [key: number]: string } = {
	0: 'Clear sky',
	1: 'Mainly clear',
	2: 'Partly cloudy',
	3: 'Overcast',
	45: 'Foggy',
	48: 'Foggy',
	51: 'Light drizzle',
	53: 'Moderate drizzle',
	55: 'Heavy drizzle',
	56: 'Light freezing drizzle',
	57: 'Heavy freezing drizzle',
	61: 'Light rain',
	63: 'Moderate rain',
	65: 'Heavy rain',
	66: 'Light freezing rain',
	67: 'Heavy freezing rain',
	71: 'Slight snow fall',
	73: 'Moderate snow fall',
	75: 'Heavy snow fall',
	77: 'Snow grains',
	80: 'Light rain showers',
	81: 'Moderate rain showers',
	82: 'Heavy rain showers',
	85: 'Light snow showers',
	86: 'Heavy snow showers',
	95: 'Thunderstorm',
	96: 'Light thunderstorm with hail',
	99: 'Heavy thunderstorm with hail'
};

export const load: PageLoad = async ({ fetch }) => {
	const lat = '-37.814';
	const long = '144.9633';
	try {
		const res = await fetch(
			`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=weather_code&hourly=temperature_2m,weather_code&forecast_days=1`
		);
		const data: {
			current: { weather_code: number };
			hourly: { temperature_2m: number[] };
		} = await res.json();

		const weather = {
			temp: data.hourly.temperature_2m.pop(),
			code: weatherCodes[data.current.weather_code]
		};

		return weather;
	} catch (error) {
		console.error(error);
	}
};
