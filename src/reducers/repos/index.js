import types from '../../actions/types';

export default (state = [], { payload, type }) => {
  switch (type) {
    case types.SEARCH_REPOS:
      return [...payload];

    default:
      return state;
  }
}