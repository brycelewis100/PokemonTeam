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

interface stat {
  base_stat: number;
  stat: {
    name: string;
  };
}
export interface PokemonDetail {
  name: string;
  stats: stat[];
  sprites: { back_default: string };
}
export type PokemonList = PokemonListItem[];
