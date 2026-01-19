import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import FavoritesPage from '../pages/FavoritesPage';
import { STORAGE_KEY } from '../hooks/useFavorites';

const favorite = {
  id: 99,
  name: 'Morty Smith',
  status: 'Alive',
  species: 'Human',
  image: 'https://example.com/morty.png'
};

describe('FavoritesPage', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('persists favorites between reloads', () => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify([favorite]));

    const { unmount } = render(
      <MemoryRouter>
        <FavoritesPage />
      </MemoryRouter>
    );

    expect(screen.getByText('Morty Smith')).toBeInTheDocument();
    unmount();

    render(
      <MemoryRouter>
        <FavoritesPage />
      </MemoryRouter>
    );

    expect(screen.getByText('Morty Smith')).toBeInTheDocument();
  });
});
