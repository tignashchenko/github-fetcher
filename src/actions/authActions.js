import types from './types';

export default Object.freeze({
  signInSuccess: () => (
    dispatch => {
      dispatch({
        type: types.SIGN_IN_SUCCESS
      })
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
    }
  )
});