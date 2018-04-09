import types from '../../actions/types';

export default (state = [], { payload, type }) => {
  switch (type) {
    case types.SEARCH_REPOS_SUCCESS:
      return [...payload];

    default:
      return state;
  }
}