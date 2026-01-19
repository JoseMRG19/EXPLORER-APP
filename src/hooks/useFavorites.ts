import { useCallback, useEffect, useState } from 'react';
import { Character, CharacterSummary } from '../types/api';

const STORAGE_KEY = 'explorer-favorites';

const toSummary = (character: Character): CharacterSummary => ({
  id: character.id,
  name: character.name,
  status: character.status,
  species: character.species,
  image: character.image
});

const readStorage = (): CharacterSummary[] => {
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as CharacterSummary[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export default function useFavorites() {
  const [favorites, setFavorites] = useState<CharacterSummary[]>(() => readStorage());

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const isFavorite = useCallback(
    (id: number) => favorites.some((favorite) => favorite.id === id),
    [favorites]
  );

  const toggleFavorite = useCallback(
    (character: Character) => {
      setFavorites((prev) => {
        const exists = prev.some((favorite) => favorite.id === character.id);
        if (exists) {
          return prev.filter((favorite) => favorite.id !== character.id);
        }
        return [toSummary(character), ...prev];
      });
    },
    [setFavorites]
  );

  const removeFavorite = useCallback(
    (id: number) => {
      setFavorites((prev) => prev.filter((favorite) => favorite.id !== id));
    },
    [setFavorites]
  );

  return {
    favorites,
    isFavorite,
    toggleFavorite,
    removeFavorite
  };
}

export { STORAGE_KEY, toSummary };
