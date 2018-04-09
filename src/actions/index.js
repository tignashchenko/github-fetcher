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
  )
})