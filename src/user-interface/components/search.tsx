import { useState, useEffect } from 'react';
import {
  TextField,
  Box,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  Card,
  Grid,
} from '@mui/material';

import { makeStyles } from '@mui/styles';

import Result from './result';

import axios, { AxiosResponse } from 'axios';

export interface PokemonSimple {
  name: string;
  url: string;
}

interface Pokemon {
  sprites: { back_default: string };
  name: string;
}

export type TPokemonList = PokemonSimple[];
export type TPokemonSimple = PokemonSimple;

const Search = () => {
  const [allPokemon, setAllPokemon] = useState<TPokemonList>([
    { name: '', url: '' },
  ]);

  const [filteredPokemon, setFilteredPokemon] = useState<TPokemonList>([
    { name: '', url: '' },
  ]);

  const [term, setTerm] = useState('');

  const getAllPokemon = async () => {
    const pokemonAllData = await axios.get(
      'https://pokeapi.co/api/v2/pokemon/?limit=10000',
      {
        params: {
          text: term,
        },
      }
    );
    const pokemonList: TPokemonList = pokemonAllData.data.results.filter(
      (el: { name: string }) => {
        return !el.name.includes('-');
      }
    );
    setAllPokemon(pokemonList);
    setFilteredPokemon(pokemonList);
  };

  const search = (term: string) => {
    let filteredPokemon = allPokemon.filter((el) => {
      return el.name.startsWith(term);
    });

    setFilteredPokemon(filteredPokemon);
  };

  useEffect(() => {
    getAllPokemon();
  }, []);

  return (
    <Box>
      <h1>Search for Pokemon</h1>
      <Box>
        <FormControl fullWidth sx={{ m: 1 }}>
          <OutlinedInput
            id="pokemon"
            value={term}
            onChange={(e) => {
              setTerm(e.target.value);
              search(e.target.value);
            }}
            autoComplete="off"
          />
        </FormControl>

        {Array.from(term).length > 2 && (
          <Grid container>
            {filteredPokemon.map((pokemon) => {
              return <Result pokemon={pokemon} key={pokemon.name} />;
            })}
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default Search;
