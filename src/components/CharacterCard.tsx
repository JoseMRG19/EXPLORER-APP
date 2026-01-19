import { Link } from 'react-router-dom';
import FavoriteButton from './FavoriteButton';
import { CharacterSummary } from '../types/api';

interface CharacterCardProps {
  character: CharacterSummary;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export default function CharacterCard({
  character,
  isFavorite,
  onToggleFavorite
}: CharacterCardProps) {
  return (
    <article className="card">
      <Link to={`/characters/${character.id}`} className="card-image-link">
        <img src={character.image} alt={character.name} loading="lazy" />
      </Link>
      <div className="card-body">
        <div>
          <h3>{character.name}</h3>
          <p className="meta">
            {character.species} · {character.status}
          </p>
        </div>
        <FavoriteButton
          active={isFavorite}
          onToggle={onToggleFavorite}
          label={
            isFavorite
              ? `Quitar ${character.name} de favoritos`
              : `Agregar ${character.name} a favoritos`
          }
        />
      </div>
    </article>
  );
}
