import { useCallback, useEffect, useMemo, useState } from 'react';
import { fetchJson } from '../services/api';
import { Episode } from '../types/api';

const BASE_URL = 'https://rickandmortyapi.com/api/episode';

const extractEpisodeIds = (urls: string[]) =>
  urls
    .map((url) => url.split('/').pop())
    .filter((id): id is string => Boolean(id));

export default function useEpisodes(episodeUrls: string[]) {
  const [data, setData] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const ids = useMemo(() => extractEpisodeIds(episodeUrls), [episodeUrls]);

  const fetchEpisodes = useCallback(
    async (signal?: AbortSignal) => {
      if (ids.length === 0) {
        setData([]);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const path = ids.length === 1 ? ids[0] : `[${ids.join(',')}]`;
        const result = await fetchJson<Episode | Episode[]>(
          `${BASE_URL}/${path}`,
          signal
        );
        setData(Array.isArray(result) ? result : [result]);
      } catch (err) {
        setData([]);
        setError(err);
      } finally {
        setLoading(false);
      }
    },
    [ids]
  );

  useEffect(() => {
    const controller = new AbortController();
    void fetchEpisodes(controller.signal);
    return () => controller.abort();
  }, [fetchEpisodes]);

  return { data, loading, error, retry: () => fetchEpisodes() };
}
