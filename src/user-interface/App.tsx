import { Provider } from 'react-redux';
import { Container, Box, Grid } from '@mui/material';
import Search from './components/search';
import Team from './components/team';

import { ThemeProvider, createTheme } from '@material-ui/core/styles';
// import { store } from '../state';
// import RepositoriesList from './RepositoriesList';

const App = () => {
  return (
    <Box>
      <Grid container>
        <Grid item xs={6} style={{ padding: 20 }}>
          <Search />
        </Grid>
        <Grid item xs={6} style={{ padding: 20 }}>
          <Team />
        </Grid>
      </Grid>
    </Box>
  );
};

export default App;
