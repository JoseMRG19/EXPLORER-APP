import { useCallback, useEffect, useState } from 'react';
import { fetchJson } from '../services/api';
import { Character } from '../types/api';

const BASE_URL = 'https://rickandmortyapi.com/api/character';

export default function useCharacter(id: string | undefined) {
  const [data, setData] = useState<Character | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const fetchData = useCallback(
    async (signal?: AbortSignal) => {
      if (!id) return;
      setLoading(true);
      setError(null);
      try {
        const result = await fetchJson<Character>(`${BASE_URL}/${id}`, signal);
        setData(result);
      } catch (err) {
        setData(null);
        setError(err);
      } finally {
        setLoading(false);
      }
    },
    [id]
  );

  useEffect(() => {
    const controller = new AbortController();
    void fetchData(controller.signal);
    return () => controller.abort();
  }, [fetchData]);

  return { data, loading, error, retry: () => fetchData() };
}
