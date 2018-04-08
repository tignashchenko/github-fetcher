import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

export default createStore(
  rootReducer, 
  applyMiddleware(thunk),
  // global.reduxNativeDevTools ?
  //     global.reduxNativeDevTools(/*options*/) :
  //     noop => noop
);