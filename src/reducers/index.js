import { combineReducers } from 'redux';

import repos from './repos';
import ui from './ui';

export default combineReducers({ repos, ui });

