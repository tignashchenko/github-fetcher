import types from './types';
import { api } from '../../utils/api';

export default Object.freeze({
  searchRepos: (searchTerm) => (
    dispatch => (
      fetch(`${api}?q=${searchTerm}`, {
        headers: {
          Accept: 'application/json'
        }
      })
      .then(res => res.json())
      .then(({ items }) => {
        dispatch({
          type: types.SEARCH_REPOS,
          payload: items
        })
      })
    )
  )
})