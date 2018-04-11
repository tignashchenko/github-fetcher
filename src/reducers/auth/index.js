import types from '../../actions/types';

export default (state = {}, { type }) => {
  switch (type) {
    case types.SIGN_IN_SUCCESS:
      return {
        signedIn: true
      }

    case types.SIGN_IN_FAILURE:
      return {
        signedIn: false
      }

    default:
      return state;
  }
}