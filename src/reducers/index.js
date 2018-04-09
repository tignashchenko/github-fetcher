import { combineReducers } from 'redux';

import repos from './repos';
import ui from './ui';
import visibilityFilter from './visibilityFilter';

export default combineReducers({ repos, ui, visibilityFilter });

