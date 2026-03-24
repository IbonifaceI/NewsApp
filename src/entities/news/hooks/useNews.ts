import { useQuery } from '@tanstack/react-query';
import type { NewsApiResponse } from '../types/news';
import { fetchNews } from '../api/fetchNews';

export function useNews(page: number, pageSize: number) {
  return useQuery<NewsApiResponse, Error>({
    queryKey: ['news', page, pageSize],
    queryFn: () => fetchNews(page, pageSize),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
  });
}