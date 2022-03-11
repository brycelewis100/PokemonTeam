// Application

export interface Player {
  idx: number;
  name: null | string;
  sprite: null | string;
}
export interface Team {
  players: Player[];
}

// Pokedex

export interface PokemonListItem {
  name: string;
  url: string;
}
export interface PokemonDetail {
  name: string;
  sprites: { back_default: string };
}
export type PokemonList = PokemonListItem[];
