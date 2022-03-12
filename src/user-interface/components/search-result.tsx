import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card, Grid, Box } from '@mui/material';

// Hooks
import { useTypedSelector } from '../../hooks/use-typed-selector';

// Interfaces
import { Player, PokemonListItem, PokemonDetail } from '../../types';

interface ResultProps {
  pokemon: PokemonListItem;
  handleOpen: (url: string) => void;
  selectPlayer: (name: string, sprite: string, players: Player[]) => void;
  full: boolean;
  players: Player[];
}

const Result: React.FC<ResultProps> = ({
  pokemon,
  handleOpen,
  selectPlayer,
  full,
  players,
}) => {
  const [sprite, setSprite] = useState<string>('');

  const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  // const players = useTypedSelector((state) => state.data.players);

  const fetchSprite: () => Promise<string> = async () => {
    const response = await axios.get<PokemonDetail>(pokemon.url);
    return response.data.sprites.back_default;
  };

  useEffect(() => {
    let isMounted = true;
    fetchSprite().then((data) => {
      if (isMounted) {
        setSprite(data);
      }
    });
    return () => {
      isMounted = false;
    };
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
          <Grid item xs={6} style={{ display: 'inline-block' }}>
            <Button
              variant="contained"
              size="small"
              style={{ width: '100%', marginBottom: '5px' }}
              onClick={() => handleOpen(pokemon.url)}
            >
              info
            </Button>

            {!full && (
              <Button
                variant="contained"
                color="success"
                size="small"
                style={{ width: '100%' }}
                onClick={() => selectPlayer(name, sprite, players)}
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
