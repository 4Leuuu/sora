import { getAnimeById, getTrendingAnimes } from '@/services/anime'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'

export function useTrendingAnimes(search?: string, tags?: string, sort?: string) {
  return useInfiniteQuery({
    queryKey: ['trendingAnimes', search, tags, sort],
    queryFn: ({pageParam = 1}) => getTrendingAnimes(pageParam, search, tags, sort),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasNextPage ? allPages.length + 1 : undefined;
    }
  })
}

export function useDetailAnimes(mediaId: number) {
  return useQuery({
    queryKey: ['detailAnime', mediaId],
    queryFn: () => getAnimeById(mediaId),
    enabled: !!mediaId
  })
}