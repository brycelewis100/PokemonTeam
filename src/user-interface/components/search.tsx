import { useState, useEffect } from 'react';
import { Box, FormControl, OutlinedInput, Grid } from '@mui/material';
import axios from 'axios';

import { PokemonList, PokemonDetail, Player } from '../../types';

import Result from './search-result';
import InfoMessage from './info-message';

import { useActions } from '../../hooks/use-actions';

interface Stats {
  name: string;
  stats: {
    name: string;
    level: number;
  }[];
  sprite: string;
}

const Search = () => {
  const init = [{ name: '', url: '' }];
  const [allPokemon, setAllPokemon] = useState<PokemonList>(init);
  const [filteredPokemon, setFilteredPokemon] = useState<PokemonList>(init);
  const [term, setTerm] = useState('');

  const [open, setOpen] = useState(false);
  const messageResetVal = {
    name: '',
    stats: [
      {
        name: '',
        level: 0,
      },
    ],
    sprite: '',
  };
  const [messageData, setMessageData] = useState(messageResetVal);

  const { addPlayer } = useActions();

  const handleOpen = (url: string) => {
    getStats(url);
    setOpen(true);
  };
  const handleClose = () => {
    setMessageData(messageResetVal);
    setOpen(false);
  };

  const getStats = async (url: string) => {
    const response = await axios.get<PokemonDetail>(url);
    const baseStats = response.data.stats.map((stat) => {
      return {
        name: stat.stat.name,
        level: stat.base_stat,
      };
    });

    const fullStats: Stats = {
      name: response.data.name,
      stats: baseStats,
      sprite: response.data.sprites.back_default,
    };
    setMessageData(fullStats);
    return fullStats;
  };

  const getAllPokemon = async () => {
    const pokemonAllData = await axios.get(
      'https://pokeapi.co/api/v2/pokemon/?limit=10000'
    );
    const pokemonList: PokemonList = pokemonAllData.data.results.filter(
      (el: { name: string }) => {
        return !el.name.includes('-');
      }
    );
    return pokemonList;
  };

  const search = (term: string) => {
    let filteredPokemon = allPokemon.filter((el) => {
      return el.name.startsWith(term);
    });
    setFilteredPokemon(filteredPokemon);
  };

  const selectPlayer = (name: string, sprite: string, players: Player[]) => {
    const [index] = Object.entries(players)
      .filter((player) => {
        const [_, object] = player;
        const objectValues = Object.values(object);
        return objectValues.some((value) => value === null);
      })
      .map((player) => {
        const [key, _] = player;
        return key;
      });

    const playerObj: Player = { idx: parseInt(index), name, sprite };
    addPlayer(parseInt(index), playerObj);
  };

  useEffect(() => {
    let isMounted = true; // note mutable flag
    getAllPokemon().then((data) => {
      if (isMounted) {
        setAllPokemon(data);
        setFilteredPokemon(data);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Box>
      <InfoMessage
        open={open}
        handleClose={handleClose}
        messageData={messageData}
        selectPlayer={selectPlayer}
      />
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

        {Array.from(term).length > 1 && (
          <Grid container>
            {filteredPokemon.map((pokemon) => {
              return (
                <Result
                  pokemon={pokemon}
                  key={pokemon.name}
                  handleOpen={handleOpen}
                  selectPlayer={selectPlayer}
                />
              );
            })}
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default Search;
