import axios from 'axios';
import { useQuery } from 'react-query';
import { CountryType, DailyDataType, MainDataType } from '../Types/covidDataType';

const baseUrl = 'https://disease.sh/v3/covid-19';

export const fetchData = (country: string) => {
  let url;

  if (country !== 'global') {
    url = `${baseUrl}/countries/${country}`;
  } else {
    url = `${baseUrl}/all`;
  }

  return axios.get<MainDataType>(url);
};

export const useFetchData = (country: string) => {
  return useQuery(['data', country], () => fetchData(country));
};

export const fetchDailyData = async () => {
  return axios.get<DailyDataType>(`${baseUrl}/historical/all?lastdays=all`);
};

export const useFetchDailyData = () => {
  return useQuery('dailyData', fetchDailyData);
};

export const fetchCountries = () => {
  return axios.get<Array<CountryType>>(`${baseUrl}/countries`);
};

export const useFetchCountries = () => {
  return useQuery('countries', fetchCountries);
};
