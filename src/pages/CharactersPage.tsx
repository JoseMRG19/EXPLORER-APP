import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import CharacterCard from '../components/CharacterCard';
import EmptyState from '../components/EmptyState';
import Filters from '../components/Filters';
import Pagination from '../components/Pagination';
import SkeletonGrid from '../components/SkeletonGrid';
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

  useEffect(() => {
    if (rawName !== nameInput) setNameInput(rawName);
    if (rawStatus !== statusInput) setStatusInput(rawStatus);
    if (rawSpecies !== speciesInput) setSpeciesInput(rawSpecies);
  }, [rawName, rawStatus, rawSpecies, nameInput, statusInput, speciesInput]);

  useEffect(() => {
    const currentName = getSearchValue(searchParams, 'name');
    const currentStatus = getSearchValue(searchParams, 'status');
    const currentSpecies = getSearchValue(searchParams, 'species');

    if (
      currentName === debouncedName &&
      currentStatus === statusInput &&
      currentSpecies === speciesInput
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
    searchParams,
    setSearchParams
  ]);

  const onClear = () => {
    setSearchParams({ page: String(DEFAULT_PAGE) });
  };

  const onPageChange = (nextPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(nextPage));
    setSearchParams(params, { replace: true });
  };

  return (
    <section className="page">
      <div className="page-header">
        <div>
          <p className="kicker">Explora el multiverso</p>
          <h2>Personajes</h2>
        </div>
        <Link to="/favorites" className="ghost-button">
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
              Reiniciar filtros
            </button>
          }
        />
      )}

      {!loading && error && !isEmpty && (
        <div className="error-state" role="alert">
          <p>{getErrorMessage(error)}</p>
          <button type="button" onClick={retry} className="primary-button">
            Reintentar
          </button>
        </div>
      )}

      {!loading && data && (
        <>
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
