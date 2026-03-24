import axios from 'axios';
import type { NewsApiResponse } from '../types/news';

const API_KEY = '8c6b6ea24faa4c1c90854054cb0942d3';
const BASE_URL = 'https://newsapi.org/v2/everything';

export async function fetchNews(page: number, pageSize: number): Promise<NewsApiResponse> {
  const response = await axios.get<NewsApiResponse>(BASE_URL, {
    params: {
      q: 'bitcoin',
      apiKey: API_KEY,
      page,
      pageSize,
      language: 'ru',
      sortBy: 'publishedAt',
    },
  });
  return response.data;
}