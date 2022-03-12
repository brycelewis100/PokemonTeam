import { useState, useEffect } from 'react';
import { Box, FormControl, OutlinedInput, Grid } from '@mui/material';
import axios from 'axios';
import { useTypedSelector } from '../../hooks/use-typed-selector';
import { PokemonAll, PokemonList, PokemonDetail, Player } from '../../types';

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
  const init: PokemonList = [{ name: '', url: '' }];
  const [allPokemon, setAllPokemon] = useState<PokemonList>(init);
  const [filteredPokemon, setFilteredPokemon] = useState<PokemonList>(init);
  const [term, setTerm] = useState('');
  const [full, setFull] = useState(false);

  const players = useTypedSelector((state) => state.data.players);

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

  const handleOpen: (url: string) => void = (url) => {
    getStats(url);
    setOpen(true);
  };
  const handleClose: () => void = () => {
    setMessageData(messageResetVal);
    setOpen(false);
  };

  const getStats: (url: string) => Promise<Stats> = async (url) => {
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

  const getAllPokemon: () => Promise<PokemonList> = async () => {
    const pokemonAllData = await axios.get<PokemonAll>(
      'https://pokeapi.co/api/v2/pokemon/?limit=10000'
    );
    const pokemonList: PokemonList = pokemonAllData.data.results.filter(
      (el: { name: string }) => {
        return !el.name.includes('-');
      }
    );
    return pokemonList;
  };

  const search: (term: string) => void = (term) => {
    let filteredPokemon = allPokemon.filter((el) => {
      return el.name.startsWith(term);
    });
    setFilteredPokemon(filteredPokemon);
  };

  const selectPlayer: (
    name: string,
    sprite: string,
    players: Player[]
  ) => void = (name, sprite, players) => {
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
    if (
      players[0].name &&
      players[1].name &&
      players[2].name &&
      players[3].name &&
      players[4].name &&
      players[5].name
    ) {
      setFull(true);
    } else {
      setFull(false);
    }
  }, [players]);

  useEffect(() => {
    let isMounted = true;
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
        full={full}
        players={players}
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
                  full={full}
                  players={players}
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
