import { afterEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CharactersPage from '../pages/CharactersPage';
import { clearCache } from '../services/api';

const mockResponse = {
  info: {
    count: 1,
    pages: 1,
    next: null,
    prev: null
  },
  results: [
    {
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
      origin: { name: 'Earth', url: '' },
      location: { name: 'Citadel of Ricks', url: '' },
      image: 'https://example.com/rick.png',
      episode: []
    }
  ]
};

describe('CharactersPage', () => {
  afterEach(() => {
    clearCache();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('renders the character list', async () => {
    const fetchMock = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse
    } as Response);
    vi.stubGlobal('fetch', fetchMock);

    render(
      <MemoryRouter initialEntries={['/characters?page=1']}>
        <CharactersPage />
      </MemoryRouter>
    );

    expect(await screen.findByText('Rick Sanchez')).toBeInTheDocument();
  });
});
