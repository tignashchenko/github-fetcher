import types from '../../actions/types';

export default (state = [], { payload, type }) => {
  switch (type) {
    case types.SEARCH_REPOS_SUCCESS: 
    case types.SORT_REPOS_BY_NAME: {
      const sortedRepos = payload.sort((a, b) => {
        const textA = a.name.toUpperCase();
        const textB = b.name.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      return sortedRepos;
    }

    case types.SORT_REPOS_BY_STARS: {
      const sortedRepos = payload.sort((a, b) => {
        const textA = a.stargazers_count;
        const textB = b.stargazers_count;
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      return sortedRepos;
    }

    case types.SORT_REPOS_BY_FORKS: {
      const sortedRepos = payload.sort((a, b) => {
        const textA = a.forks_count;
        const textB = b.forks_count;
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      return sortedRepos;
    }

    case types.GET_MORE_REPOS_SUCCESS:
      return payload;

    case types.GET_REPOS_OFFLINE:
      return payload;
  
    default:
      return state;
  }
}