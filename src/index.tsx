import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './state';

import Application from './user-interface/App';

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <Application />
      </div>
    </Provider>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
