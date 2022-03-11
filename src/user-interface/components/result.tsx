import { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { store } from '../../state';

import { useTypedSelector } from '../../hooks/use-typed-selector';
import Player from './player';

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

import { TPokemonSimple } from './search';
import { useActions } from '../../hooks/use-actions';

interface ResultProps {
  pokemon: TPokemonSimple;
}

const Result: React.FC<ResultProps> = ({ pokemon }) => {
  const [sprite, setSprite] = useState<string>('');
  const { addPlayer } = useActions();
  const players = useTypedSelector((state) => state.data.players);

  const [full, setFull] = useState(false);

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

  const getSprite = async () => {
    const response = await axios.get(pokemon.url);
    setSprite(response.data.sprites.back_default);
  };

  const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

  const Add = (name: string, sprite: string) => {
    const state = store.getState();
    const roster = state.data.players;
    console.log(state);

    const [index] = Object.entries(roster)
      .filter((entry) => {
        const [key, object] = entry;
        const objectValues = Object.values(object);
        return objectValues.some((value) => value === null);
      })
      .map((entry) => {
        const [key, object] = entry;
        return key;
      });

    const playerAdd = { idx: parseInt(index), name, sprite };

    addPlayer(parseInt(index), playerAdd);
  };

  useEffect(() => {
    getSprite();
  });

  return (
    <Grid item sm={6} md={3}>
      <Card
        style={{
          padding: '20px',
          margin: '5px',
        }}
      >
        <h2>{name}</h2>
        <Grid container style={{ display: 'flex', alignItems: 'center' }}>
          <Grid item xs={6}>
            <img src={sprite} width="100%"></img>
          </Grid>
          <Grid item xs={6}>
            {!full && (
              <Button variant="contained" onClick={() => Add(name, sprite)}>
                Select
              </Button>
            )}
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};

export default Result;
