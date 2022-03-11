import { createStore } from 'redux';
import rootReducer from './reducers';

// const persistedReducer = persistReducer(persistConfig, reducer);

// const initialState = {
//   players: [
//     { idx: 0, name: null, sprite: null },
//     { idx: 1, name: null, sprite: null },
//     { idx: 2, name: null, sprite: null },
//     { idx: 3, name: null, sprite: null },
//     { idx: 4, name: null, sprite: null },
//     { idx: 5, name: null, sprite: null },
//   ],
// };

export const store = createStore(rootReducer);

// const persistor = persistStore(store);
// store.subscribe(() => console.log("An action has ben fired here "));
