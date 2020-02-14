import { combineReducers } from 'redux';
import simpleReducer from './simpleReducer';
import notesReducer from './notesReducer';
import archivedReducer from './archivedReducer';
import searchReducer from './searchReducer';
import settingsReducer from './settingsReducer';

export default combineReducers({
    simpleReducer,
    notes: notesReducer,
    archived: archivedReducer,
    search: searchReducer,
    settings: settingsReducer
});