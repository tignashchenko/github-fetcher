import types from '../../actions/types';

export default (state = { visibilityFilter: 'Name' }, { type }) => {
  switch (type) {
    case types.SORT_REPOS_BY_NAME:
      return { sortBy: 'Name' }

    case types.SORT_REPOS_BY_STARS:
      return { sortBy: 'Stars' }

    case types.SORT_REPOS_BY_FORKS:
      return { sortBy: 'Forks' }

    default:
      return state;
  }
}