import types from '../../actions/types';

export default (state = {}, { type }) => {
  switch (type) {
    case types.SEARCH_REPOS:
      return {
        isLoading: true,
        isRefreshing: false
      }

    case types.SEARCH_REPOS_SUCCESS:
    case types.SEARCH_REPOS_FAILURE:
      return {
        isLoading: false
      }

    case types.GET_MORE_REPOS:
      return {
        isRefreshing: true
      }

    case types.GET_MORE_REPOS_SUCCESS:
    case types.GET_MORE_REPOS_FAILURE:
      return {
        isRefreshing: false
      }
    
    default:
      return state;
  }
}