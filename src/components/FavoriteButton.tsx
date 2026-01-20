import React from 'react';

interface FavoriteButtonProps {
  active: boolean;
  onToggle: () => void;
  label?: string;
}

export default function FavoriteButton({
  active,
  onToggle,
  label = 'Alternar favorito'
}: FavoriteButtonProps) {
  return (
    <button
      type="button"
      className={active ? 'favorite-button active' : 'favorite-button'}
      onClick={onToggle}
      aria-pressed={active}
      aria-label={label}
    >
      {active ? 'Quitar' : 'Favorito'}
    </button>
  );
}
