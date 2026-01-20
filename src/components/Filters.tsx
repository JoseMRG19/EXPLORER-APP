import React from 'react';
import Icon from './icons';

interface FiltersProps {
  name: string;
  status: string;
  species: string;
  onNameChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onSpeciesChange: (value: string) => void;
  onClear: () => void;
}

export default function Filters({
  name,
  status,
  species,
  onNameChange,
  onStatusChange,
  onSpeciesChange,
  onClear
}: FiltersProps) {
  return (
    <section className="filters" aria-label="Filtros de personajes">
      <label className="field">
        <span>Buscar</span>
        <div className="input-with-icon">
          <Icon name="search" />
          <input
            type="search"
            placeholder="Nombre del personaje"
            value={name}
            onChange={(event) => onNameChange(event.target.value)}
          />
        </div>
      </label>
      <div className="field">
        <span>Estado</span>
        <div className="category-buttons" role="group" aria-label="Estado">
          <button
            type="button"
            className={status === '' ? 'chip active' : 'chip'}
            onClick={() => onStatusChange('')}
            aria-pressed={status === ''}
          >
            <Icon name="alien" />
            Todos
          </button>
          <button
            type="button"
            className={status === 'alive' ? 'chip active' : 'chip'}
            onClick={() => onStatusChange('alive')}
            aria-pressed={status === 'alive'}
          >
            <Icon name="alive" />
            Alive
          </button>
          <button
            type="button"
            className={status === 'dead' ? 'chip active' : 'chip'}
            onClick={() => onStatusChange('dead')}
            aria-pressed={status === 'dead'}
          >
            <Icon name="dead" />
            Dead
          </button>
          <button
            type="button"
            className={status === 'unknown' ? 'chip active' : 'chip'}
            onClick={() => onStatusChange('unknown')}
            aria-pressed={status === 'unknown'}
          >
            <Icon name="unknown" />
            Unknown
          </button>
        </div>
      </div>
      <label className="field">
        <span>Especie</span>
        <div className="input-with-icon">
          <Icon name="species" />
          <input
            type="text"
            placeholder="Humanoid, Alien..."
            value={species}
            onChange={(event) => onSpeciesChange(event.target.value)}
          />
        </div>
      </label>
      <button type="button" className="ghost-button filter-clear" onClick={onClear}>
        <Icon name="filter" />
        Limpiar filtros
      </button>
    </section>
  );
}
