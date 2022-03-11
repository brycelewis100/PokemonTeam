import { useState, useEffect } from 'react';
import { Box, FormControl, OutlinedInput, Grid } from '@mui/material';

import Result from './search-result';

import axios, { AxiosResponse } from 'axios';

import { PokemonList } from '../../types';

const Search = () => {
  const init = [{ name: '', url: '' }];
  const [allPokemon, setAllPokemon] = useState<PokemonList>(init);
  const [filteredPokemon, setFilteredPokemon] = useState<PokemonList>(init);
  const [term, setTerm] = useState('');

  const getAllPokemon = async () => {
    const pokemonAllData = await axios.get(
      'https://pokeapi.co/api/v2/pokemon/?limit=10000'
    );
    const pokemonList: PokemonList = pokemonAllData.data.results.filter(
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
