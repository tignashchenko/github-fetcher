import { AsyncStorage, NetInfo } from 'react-native';

import types from './types';
import { api } from '../../utils/api';

export default Object.freeze({
  getReposOffline: (repos) => (
    dispatch => {
      dispatch({
        type: types.GET_REPOS_OFFLINE,
        payload: repos
      })
    }
  ),

  getMoreRepos: (page, repos, previousSearchTerm) => (
    dispatch => {
      dispatch({
        type: types.GET_MORE_REPOS
      })
      return fetch(`${api}?q=${previousSearchTerm}&page=${page}&per_page=15`, {
        headers: {
          Accept: 'application/json'
        }
      })
      .then(res => res.json())
      .then(({ items }) => {
        dispatch({
          type: types.GET_MORE_REPOS_SUCCESS,
          payload: [...repos, ...items]
        })
        // setRepos([...repos, ...items]);
      })
      .catch(err => {
        dispatch({
          type: types.GET_MORE_REPOS_FAILURE,
          payload: err,
          error: true
        })
      })
    }
  ),

  searchRepos: (page, searchTerm) => (
    dispatch => {
      dispatch({
        type: types.SEARCH_REPOS
      })
      NetInfo.isConnected.fetch().then(isConnected => {
        if (isConnected) {
          return fetch(`${api}?q=${searchTerm}&page=${page}&per_page=15`, {
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
            AsyncStorage.setItem('repos', JSON.stringify(items));
          })
          .catch(err => {
            dispatch({
              type: types.SEARCH_REPOS_FAILURE,
              payload: err,
              error: true
            })
          })
        } else {
          AsyncStorage.getItem('repos').then(repos => {
            dispatch({
              type: types.GET_REPOS_OFFLINE,
              payload: JSON.parse(repos)
            })
          })
        }
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