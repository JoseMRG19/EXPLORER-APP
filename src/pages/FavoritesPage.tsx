import { Link } from 'react-router-dom';
import EmptyState from '../components/EmptyState';
import useFavorites from '../hooks/useFavorites';
import Icon from '../components/icons';

export default function FavoritesPage() {
  const { favorites, removeFavorite } = useFavorites();

  if (favorites.length === 0) {
    return (
      <section className="page">
        <EmptyState
          title="No hay favoritos"
          description="Guarda tus personajes favoritos para encontrarlos rapido."
          action={
            <Link to="/characters" className="primary-button">
              <Icon name="list" />
              Explorar personajes
            </Link>
          }
        />
      </section>
    );
  }

  return (
    <section className="page">
      <div className="page-header">
        <div>
          <p className="kicker">Tu seleccion</p>
          <h2>Favoritos</h2>
        </div>
        <Link to="/characters" className="ghost-button">
          <Icon name="back" />
          Volver a explorar
        </Link>
      </div>
      <div className="card-grid favorites-grid">
        {favorites.map((character) => (
          <article key={character.id} className="card">
            <Link
              to={`/characters/${character.id}`}
              className="card-image-link"
            >
              <img src={character.image} alt={character.name} />
            </Link>
            <div className="card-body">
              <div>
                <h3>{character.name}</h3>
                <p className="meta">
                  {character.species} · {character.status}
                </p>
              </div>
              <button
                type="button"
                className="favorite-button active"
                onClick={() => removeFavorite(character.id)}
                aria-label={`Quitar ${character.name} de favoritos`}
              >
                <Icon name="star" />
                Quitar
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
