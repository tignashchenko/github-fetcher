import React, { Component } from 'react';
import { AsyncStorage, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { object } from 'prop-types';

import store from '../../store';
import SignedIn from '../../../src/routes/SignedIn';
import SignedOut from '../../../src/routes/SignedOut';
import styles from './styles';

const auth = AsyncStorage.getItem('signedIn');
const pastSearchTerm = AsyncStorage.getItem('searchTerm');

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuth: false
    }
  }

  getChildContext() {
    return {
      pastSearchTerm,
    }
  }

  componentWillMount() {
    AsyncStorage.getItem('signedIn').then((value) => {
      this.setState({
        isAuth: value
      });
    })
    .catch(err => {
    throw new Error(err);
    })
  }

  render() {
    const{ isAuth } = this.state;
    const auth = JSON.parse(isAuth);
    
    return (
      <Provider store={ store }>
        { auth ? <SignedIn /> : <SignedOut /> }
      </Provider>
    )
  }
}

App.childContextTypes = {
  pastSearchTerm: object
};
