import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card, Grid } from '@mui/material';

// Hooks
import { useTypedSelector } from '../../hooks/use-typed-selector';
import { useActions } from '../../hooks/use-actions';

// Interfaces
import { Player, PokemonListItem } from '../../types';

interface ResultProps {
  pokemon: PokemonListItem;
}

const Result: React.FC<ResultProps> = ({ pokemon }) => {
  const [sprite, setSprite] = useState<string>('');
  const [full, setFull] = useState(false);

  const { addPlayer } = useActions();

  const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  const players = useTypedSelector((state) => state.data.players);

  const fetchSprite = async () => {
    const response = await axios.get(pokemon.url);
    setSprite(response.data.sprites.back_default);
  };

  const selectPlayer = (name: string, sprite: string) => {
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
    fetchSprite();
  }, []);

  return (
    <Grid item sm={6} md={4}>
      <Card
        style={{
          padding: '15px',
          margin: '5px',
        }}
      >
        <h2>{name}</h2>
        <Grid container style={{ display: 'flex', alignItems: 'center' }}>
          <Grid item xs={6}>
            <img src={sprite} width="100%"></img>
          </Grid>
          <Grid item xs={6} style={{ display: 'flex' }}>
            {!full && (
              <Button
                variant="contained"
                size="small"
                onClick={() => selectPlayer(name, sprite)}
              >
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
