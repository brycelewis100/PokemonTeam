import { Button, Card, Grid } from '@mui/material';
import { Player } from '../../types';

//Hooks
import { useActions } from '../../hooks/use-actions';

const TeamPlayer: React.FC<Player> = ({ idx, name, sprite }) => {
  const { removePlayer } = useActions();

  return (
    <Grid item sm={6} md={4}>
      <Card
        style={{
          padding: '30px',
          margin: '5px',
          height: '14vh',
        }}
      >
        <h2>{name}</h2>
        {name && sprite && (
          <Grid container style={{ display: 'flex', alignItems: 'center' }}>
            <Grid item xs={6}>
              <img src={sprite} width="100%"></img>
            </Grid>
            <Grid item xs={6}>
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
