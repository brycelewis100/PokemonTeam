import { Provider } from 'react-redux';
import { Container } from '@mui/material';
import Search from './components/search';
import Team from './components/team';

import { ThemeProvider, createTheme } from '@material-ui/core/styles';
// import { store } from '../state';
// import RepositoriesList from './RepositoriesList';

const App = () => {
  return (
    <Container maxWidth="lg">
      <Search />
      <Team />
    </Container>
  );
};

export default App;
