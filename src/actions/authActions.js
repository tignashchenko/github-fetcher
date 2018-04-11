import { AsyncStorage } from 'react-native';

import types from './types';

export default Object.freeze({
  signIn: () => (
    dispatch => {
      dispatch({
        type: types.SIGN_IN
      })
    }
  ),
  signInSuccess: () => (
    dispatch => {
      dispatch({
        type: types.SIGN_IN_SUCCESS
      })
      AsyncStorage.setItem('signedIn', 'true')
    }
  ),

  signInFailure: () => (
    dispatch => {
      dispatch({
        type: types.SIGN_IN_FAILURE
      })
    }
  ),

  signOut: () => (
    dispatch => {
      dispatch({
        type: types.SIGN_OUT
      })
      AsyncStorage.setItem('signedIn', 'false')
    }
  )
});