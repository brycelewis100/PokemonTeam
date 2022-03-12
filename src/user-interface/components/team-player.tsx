import { Button, Card, Grid, Box } from '@mui/material';
import { Player } from '../../types';

import { useActions } from '../../hooks/use-actions';

const TeamPlayer: React.FC<Player> = ({ idx, name, sprite }) => {
  const { removePlayer } = useActions();

  return (
    <Grid item sm={6} md={6}>
      <Card
        style={{
          padding: '20px',
          margin: '5px',
          height: '20vh',
        }}
      >
        <h2>{name}</h2>
        {name && sprite && (
          <Box
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: '15vh',
            }}
          >
            <img src={sprite} width="50%"></img>
            <Button
              variant="contained"
              color="error"
              onClick={() => removePlayer(idx)}
            >
              Remove
            </Button>
          </Box>
        )}
      </Card>
    </Grid>
  );
};

export default TeamPlayer;
