import { useState, useEffect } from 'react';
import { store } from '../../state';
import { connect } from 'react-redux';

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

const Team = () => {
  const team = useTypedSelector((state) => state.data.players);

  console.log(team);

  return (
    <Box>
      <h1>Your Team</h1>
      <Grid container>
        {team.map((player) => {
          return (
            <Player
              idx={player.idx}
              name={player.name}
              sprite={player.sprite}
            />
          );
        })}
      </Grid>
    </Box>
  );
};

export default Team;
