import types from '../../actions/types';

export default (state = {}, { type, payload }) => {
  switch (type) {
    case types.SEARCH_REPOS:
      return {
        isLoading: true
      }

    case types.SEARCH_REPOS_SUCCESS:
    case types.SEARCH_REPOS_FAILURE:
      return {
        isLoading: false
      }
    
    default:
      return state;
  }
}