import { combineReducers } from 'redux';
import playersReducer from './playersReducer';

const rootReducer = combineReducers({
  data: playersReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
