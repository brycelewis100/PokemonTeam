import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistor, store } from './state/store';

import Application from './user-interface/App';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Application />
      </PersistGate>
    </Provider>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
