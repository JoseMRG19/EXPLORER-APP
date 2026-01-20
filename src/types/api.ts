export type CharacterStatus = 'Alive' | 'Dead' | 'unknown';

export interface ApiInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface CharacterLocation {
  name: string;
  url: string;
}

export interface Character {
  id: number;
  name: string;
  status: CharacterStatus;
  species: string;
  type: string;
  gender: string;
  origin: CharacterLocation;
  location: CharacterLocation;
  image: string;
  episode: string[];
}

export interface CharacterPageResponse {
  info: ApiInfo;
  results: Character[];
}

export interface Episode {
  id: number;
  name: string;
  episode: string;
}

export interface CharacterSummary {
  id: number;
  name: string;
  status: CharacterStatus;
  species: string;
  image: string;
}
