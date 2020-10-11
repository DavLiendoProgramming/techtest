import { createStore, applyMiddleware } from 'redux';
import { DataReducer } from '../../data/DataReducer';
import { asyncActions } from '../../data/AsyncMiddleware';
const PeopleStore = createStore(DataReducer, applyMiddleware(asyncActions));

export default PeopleStore;
