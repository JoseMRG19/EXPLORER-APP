import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import CharacterCard from '../components/CharacterCard';
import CharacterCarousel from '../components/CharacterCarousel';
import EmptyState from '../components/EmptyState';
import Filters from '../components/Filters';
import Pagination from '../components/Pagination';
import SkeletonGrid from '../components/SkeletonGrid';
import Icon from '../components/icons';
import useCharacters from '../hooks/useCharacters';
import useDebouncedValue from '../hooks/useDebouncedValue';
import useFavorites from '../hooks/useFavorites';
import { ApiError } from '../services/api';
import { getErrorMessage } from '../utils/errors';

const DEFAULT_PAGE = 1;

const getSearchValue = (params: URLSearchParams, key: string) =>
  params.get(key) ?? '';

export default function CharactersPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawName = getSearchValue(searchParams, 'name');
  const rawStatus = getSearchValue(searchParams, 'status');
  const rawSpecies = getSearchValue(searchParams, 'species');
  const page = Number(searchParams.get('page') ?? DEFAULT_PAGE) || DEFAULT_PAGE;

  const [nameInput, setNameInput] = useState(rawName);
  const [statusInput, setStatusInput] = useState(rawStatus);
  const [speciesInput, setSpeciesInput] = useState(rawSpecies);

  const debouncedName = useDebouncedValue(nameInput, 400);
  const { favorites, isFavorite, toggleFavorite } = useFavorites();

  const { data, loading, error, retry } = useCharacters({
    name: debouncedName || undefined,
    status: statusInput || undefined,
    species: speciesInput || undefined,
    page: String(page)
  });

  const isEmpty =
    error instanceof ApiError && error.status === 404 && !loading;

  const totalPages = data?.info.pages ?? 1;

  const cards = useMemo(() => {
    return data?.results.map((character) => (
      <CharacterCard
        key={character.id}
        character={character}
        isFavorite={isFavorite(character.id)}
        onToggleFavorite={() => toggleFavorite(character)}
      />
    ));
  }, [data?.results, isFavorite, toggleFavorite]);

  const carouselItems = useMemo(() => {
    return (
      data?.results.slice(0, 8).map((character) => ({
        id: character.id,
        name: character.name,
        status: character.status,
        species: character.species,
        image: character.image
      })) ?? []
    );
  }, [data?.results]);

  const secondaryCarouselItems = useMemo(() => {
    return (
      data?.results.slice(8, 16).map((character) => ({
        id: character.id,
        name: character.name,
        status: character.status,
        species: character.species,
        image: character.image
      })) ?? []
    );
  }, [data?.results]);

  const favoriteCarouselItems = useMemo(() => {
    return favorites.slice(0, 10);
  }, [favorites]);

  const topAliens = useMemo(() => {
    return (
      data?.results
        .filter((character) =>
          character.species.toLowerCase().includes('alien')
        )
        .slice(0, 3) ?? []
    );
  }, [data?.results]);

  const topProtagonists = useMemo(() => {
    if (!data?.results) return [];
    const ids = [1, 2, 3];
    const map = new Map(data.results.map((item) => [item.id, item]));
    const picked = ids
      .map((id) => map.get(id))
      .filter((item): item is typeof data.results[number] => Boolean(item));
    if (picked.length >= 3) return picked.slice(0, 3);
    const fallback = data.results.filter((item) => !ids.includes(item.id));
    return picked.concat(fallback.slice(0, 3 - picked.length));
  }, [data?.results]);

  const topVillains = useMemo(() => {
    if (!data?.results) return [];
    const ids = [118, 119, 157];
    const map = new Map(data.results.map((item) => [item.id, item]));
    const picked = ids
      .map((id) => map.get(id))
      .filter((item): item is typeof data.results[number] => Boolean(item));
    if (picked.length >= 3) return picked.slice(0, 3);
    const fallback = data.results.filter(
      (item) =>
        !ids.includes(item.id) &&
        item.species.toLowerCase().includes('alien')
    );
    return picked.concat(fallback.slice(0, 3 - picked.length));
  }, [data?.results]);

  useEffect(() => {
    setNameInput(rawName);
    setStatusInput(rawStatus);
    setSpeciesInput(rawSpecies);
  }, [rawName, rawStatus, rawSpecies]);

  useEffect(() => {
    if (
      rawName === debouncedName &&
      rawStatus === statusInput &&
      rawSpecies === speciesInput
    ) {
      return;
    }

    const params = new URLSearchParams();
    if (debouncedName) params.set('name', debouncedName);
    if (statusInput) params.set('status', statusInput);
    if (speciesInput) params.set('species', speciesInput);
    params.set('page', String(DEFAULT_PAGE));
    setSearchParams(params, { replace: true });
  }, [
    debouncedName,
    statusInput,
    speciesInput,
    rawName,
    rawStatus,
    rawSpecies,
    setSearchParams
  ]);

  const onClear = () => {
    setNameInput('');
    setStatusInput('');
    setSpeciesInput('');
    setSearchParams({ page: String(DEFAULT_PAGE) });
  };

  const onPageChange = (nextPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(nextPage));
    setSearchParams(params, { replace: true });
  };

  const hasActiveFilters =
    Boolean(nameInput.trim()) ||
    Boolean(statusInput.trim()) ||
    Boolean(speciesInput.trim());

  return (
    <section className="page">
      <div className="page-header">
        <div>
          <p className="kicker">Explora el multiverso</p>
          <h2>Personajes</h2>
        </div>
        <Link to="/favorites" className="ghost-button">
          <Icon name="heart" />
          Ver favoritos ({favorites.length})
        </Link>
      </div>

      <Filters
        name={nameInput}
        status={statusInput}
        species={speciesInput}
        onNameChange={setNameInput}
        onStatusChange={setStatusInput}
        onSpeciesChange={setSpeciesInput}
        onClear={onClear}
      />

      {loading && <SkeletonGrid />}

      {!loading && isEmpty && (
        <EmptyState
          title="No hay resultados"
          description="Intenta con otro nombre, estado o especie."
          action={
            <button type="button" onClick={onClear} className="primary-button">
              <Icon name="filter" />
              Reiniciar filtros
            </button>
          }
        />
      )}

      {!loading && error && !isEmpty && (
        <div className="error-state" role="alert">
          <p>{getErrorMessage(error)}</p>
          <button type="button" onClick={retry} className="primary-button">
            <Icon name="spark" />
            Reintentar
          </button>
        </div>
      )}

      {!loading && data && (
        <>
          {!hasActiveFilters && (
            <>
              <CharacterCarousel
                title="Top del momento"
                items={carouselItems}
                autoScroll
                singleItem
              />
              <CharacterCarousel
                title="Vistos recientemente"
                items={secondaryCarouselItems}
                autoScroll
                singleItem
              />
              <CharacterCarousel
                title="Tus favoritos"
                items={favoriteCarouselItems}
                autoScroll
                singleItem
              />
              <section className="top-lists">
                <div className="top-list top-list-compact">
                  <div className="top-list-header">
                    <h3>Top 3 Aliens</h3>
                    <p className="muted">Los mas vistos del multiverso.</p>
                  </div>
                  <div className="top-grid">
                    {topAliens.map((character) => (
                      <CharacterCard
                        key={`alien-${character.id}`}
                        character={character}
                        isFavorite={isFavorite(character.id)}
                        onToggleFavorite={() => toggleFavorite(character)}
                      />
                    ))}
                  </div>
                </div>
                <div className="top-list">
                  <div className="top-list-header">
                    <h3>Protagonistas</h3>
                    <p className="muted">Los personajes principales.</p>
                  </div>
                  <div className="top-grid">
                    {topProtagonists.map((character) => (
                      <CharacterCard
                        key={`hero-${character.id}`}
                        character={character}
                        isFavorite={isFavorite(character.id)}
                        onToggleFavorite={() => toggleFavorite(character)}
                      />
                    ))}
                  </div>
                </div>
                <div className="top-list">
                  <div className="top-list-header">
                    <h3>Villanos</h3>
                    <p className="muted">Antagonistas memorables.</p>
                  </div>
                  <div className="top-grid">
                    {topVillains.map((character) => (
                      <CharacterCard
                        key={`villain-${character.id}`}
                        character={character}
                        isFavorite={isFavorite(character.id)}
                        onToggleFavorite={() => toggleFavorite(character)}
                      />
                    ))}
                  </div>
                </div>
              </section>
            </>
          )}
          <div className="card-grid">{cards}</div>
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            hasPrev={Boolean(data.info.prev)}
            hasNext={Boolean(data.info.next)}
            onPageChange={onPageChange}
          />
        </>
      )}
    </section>
  );
}
