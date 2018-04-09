import types from './types';
import { api } from '../../utils/api';

export default Object.freeze({
  searchRepos: (searchTerm) => (
    dispatch => {
      dispatch({
        type: types.SEARCH_REPOS
      })
      return fetch(`${api}?q=${searchTerm}&per_page=100`, {
        headers: {
          Accept: 'application/json'
        }
      })
      .then(res => res.json())
      .then(({ items }) => {
        dispatch({
          type: types.SEARCH_REPOS_SUCCESS,
          payload: items
        })
      })
      .catch(err => {
        dispatch({
          type: types.SEARCH_REPOS_FAILURE,
          payload: err,
          error: true
        })
      })
    }
  ),

  sortRepos: (visibility, repos) => (
    dispatch => {
      if (visibility === 'Forks') {
        dispatch({
          type: types.SORT_REPOS_BY_FORKS,
          payload: repos
        })
      } else if (visibility === 'Stars') {
        dispatch({
          type: types.SORT_REPOS_BY_STARS,
          payload: repos
        })
      } else {
        dispatch({
          type: types.SORT_REPOS_BY_NAME,
          payload: repos
        })
      } 
    }
  )
});