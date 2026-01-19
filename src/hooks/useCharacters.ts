import { useCallback, useEffect, useMemo, useState } from 'react';
import { fetchJson } from '../services/api';
import { CharacterPageResponse } from '../types/api';

const BASE_URL = 'https://rickandmortyapi.com/api/character';

export interface CharacterQuery {
  name?: string;
  status?: string;
  species?: string;
  page?: string;
}

export default function useCharacters(query: CharacterQuery) {
  const [data, setData] = useState<CharacterPageResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const url = useMemo(() => {
    const params = new URLSearchParams();
    if (query.name) params.set('name', query.name);
    if (query.status) params.set('status', query.status);
    if (query.species) params.set('species', query.species);
    if (query.page) params.set('page', query.page);
    const queryString = params.toString();
    return queryString ? `${BASE_URL}/?${queryString}` : `${BASE_URL}?page=1`;
  }, [query.name, query.status, query.species, query.page]);

  const fetchData = useCallback(
    async (signal?: AbortSignal) => {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchJson<CharacterPageResponse>(url, signal);
        setData(result);
      } catch (err) {
        setData(null);
        setError(err);
      } finally {
        setLoading(false);
      }
    },
    [url]
  );

  useEffect(() => {
    const controller = new AbortController();
    void fetchData(controller.signal);
    return () => controller.abort();
  }, [fetchData]);

  return { data, loading, error, retry: () => fetchData() };
}
