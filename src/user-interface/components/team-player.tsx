import { Button, Card, Grid, Box } from '@mui/material';
import { Player } from '../../types';

//Hooks
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
          <Grid container style={{ display: 'flex', alignItems: 'center' }}>
            <Grid item xs={6}>
              <img src={sprite} width="75%"></img>
            </Grid>
            <Grid item xs={6} style={{ justifyContent: 'right' }}>
              <Button
                variant="contained"
                color="error"
                onClick={() => removePlayer(idx)}
              >
                Remove
              </Button>
            </Grid>
          </Grid>
        )}
      </Card>
    </Grid>
  );
};

export default TeamPlayer;
