import React, { Component, createContext } from 'react';
import { AsyncStorage, StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';

import store from './src/store';
import SignedIn from './src/routes/SignedIn';
import SignedOut from './src/routes/SignedOut';

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
  pastSearchTerm: PropTypes.string
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#95a5a6',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
