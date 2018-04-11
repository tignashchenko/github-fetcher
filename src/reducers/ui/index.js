import types from '../../actions/types';

export default (state = {}, { type }) => {
  switch (type) {
    case types.SIGN_IN:
      return {
        isSigningIn: true
      }
    case types.SIGN_IN_SUCCESS:
    case types.SIGN_IN_FAILURE:
      return {
        isSigningIn: false
      }

    case types.SEARCH_REPOS:
      return {
        isLoading: true
      }

    case types.SEARCH_REPOS_SUCCESS:
    case types.SEARCH_REPOS_FAILURE:
    case types.GET_REPOS_OFFLINE:
      return {
        isLoading: false
      }
    
    default:
      return state;
  }
}