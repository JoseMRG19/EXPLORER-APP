import React from 'react';

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
        <input
          type="search"
          placeholder="Nombre del personaje"
          value={name}
          onChange={(event) => onNameChange(event.target.value)}
        />
      </label>
      <label className="field">
        <span>Estado</span>
        <select
          value={status}
          onChange={(event) => onStatusChange(event.target.value)}
        >
          <option value="">Todos</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>
      </label>
      <label className="field">
        <span>Especie</span>
        <input
          type="text"
          placeholder="Humanoid, Alien..."
          value={species}
          onChange={(event) => onSpeciesChange(event.target.value)}
        />
      </label>
      <button type="button" className="ghost-button" onClick={onClear}>
        Limpiar filtros
      </button>
    </section>
  );
}
