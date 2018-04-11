import { combineReducers } from 'redux';

import auth from './auth';
import repos from './repos';
import ui from './ui';
import visibilityFilter from './visibilityFilter';

export default combineReducers({ auth, repos, ui, visibilityFilter });

