import { Link, useParams } from 'react-router-dom';
import FavoriteButton from '../components/FavoriteButton';
import EmptyState from '../components/EmptyState';
import useCharacter from '../hooks/useCharacter';
import useEpisodes from '../hooks/useEpisodes';
import useFavorites from '../hooks/useFavorites';
import { getErrorMessage } from '../utils/errors';
import Icon from '../components/icons';
import useCharacters from '../hooks/useCharacters';
import CharacterCard from '../components/CharacterCard';

export default function CharacterDetailPage() {
  const { id } = useParams();
  const { data: character, loading, error, retry } = useCharacter(id);
  const { data: episodes, loading: loadingEpisodes } = useEpisodes(
    character?.episode ?? []
  );
  const { isFavorite, toggleFavorite } = useFavorites();
  const { data: relatedData } = useCharacters({
    species: character?.species,
    status: character?.gender?.toLowerCase()
  });

  const relatedCharacters =
    relatedData?.results
      .filter((item) => item.id !== character?.id)
      .slice(0, 4) ?? [];

  if (loading) {
    return (
      <section className="page detail-page">
        <div className="detail-skeleton" />
      </section>
    );
  }

  if (error) {
    return (
      <section className="page detail-page">
        <div className="error-state" role="alert">
          <p>{getErrorMessage(error)}</p>
          <button type="button" onClick={retry} className="primary-button">
            <Icon name="spark" />
            Reintentar
          </button>
        </div>
      </section>
    );
  }

  if (!character) {
    return (
      <section className="page detail-page">
        <EmptyState
          title="Personaje no encontrado"
          description="No pudimos cargar este personaje."
          action={
            <Link to="/characters" className="primary-button">
              <Icon name="back" />
              Volver al listado
            </Link>
          }
        />
      </section>
    );
  }

  return (
    <section className="page detail-page">
      <Link to="/characters" className="ghost-button">
        <Icon name="back" />
        Volver al listado
      </Link>

      <div className="detail-card">
        <img src={character.image} alt={character.name} />
        <div className="detail-info">
          <div className="detail-header">
            <div>
              <p className="kicker">Personaje</p>
              <h2>{character.name}</h2>
            </div>
            <FavoriteButton
              active={isFavorite(character.id)}
              onToggle={() => toggleFavorite(character)}
              label={
                isFavorite(character.id)
                  ? `Quitar ${character.name} de favoritos`
                  : `Agregar ${character.name} a favoritos`
              }
            />
          </div>
          <div className="detail-meta">
            <div>
              <span>Estado</span>
              <strong>{character.status}</strong>
            </div>
            <div>
              <span>Especie</span>
              <strong>{character.species}</strong>
            </div>
            <div>
              <span>Genero</span>
              <strong>{character.gender}</strong>
            </div>
            <div>
              <span>Origen</span>
              <strong>{character.origin.name}</strong>
            </div>
            <div>
              <span>Ubicacion</span>
              <strong>{character.location.name}</strong>
            </div>
          </div>
        </div>
      </div>

      <section className="episodes">
        <div className="episodes-header">
          <h3>Episodios</h3>
          {loadingEpisodes && <span>Cargando episodios...</span>}
        </div>
        {episodes.length === 0 && !loadingEpisodes ? (
          <p className="muted">No hay episodios disponibles.</p>
        ) : (
          <ul>
            {episodes.map((episode) => (
              <li key={episode.id}>
                <span className="episode-code">{episode.episode}</span>
                <span>{episode.name}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      {relatedCharacters.length > 0 && (
        <section className="suggested">
          <div className="suggested-header">
            <h3>Sugeridos</h3>
            <p className="muted">Personajes similares por especie y genero.</p>
          </div>
          <div className="card-grid">
            {relatedCharacters.map((item) => (
              <CharacterCard
                key={`related-${item.id}`}
                character={item}
                isFavorite={isFavorite(item.id)}
                onToggleFavorite={() => toggleFavorite(item)}
              />
            ))}
          </div>
        </section>
      )}
    </section>
  );
}
