import { Box, Grid } from '@mui/material';
import { useTypedSelector } from '../../hooks/use-typed-selector';
import TeamPlayer from './team-player';

const Team = () => {
  const team = useTypedSelector((state) => state.data.players);
  return (
    <Box>
      <h1>Your Team</h1>
      <Grid container>
        {team.map((player) => {
          return (
            <TeamPlayer
              key={player.idx}
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
