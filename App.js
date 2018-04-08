import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';

import store from './src/store';
import Feed from './src/components/Feed';
import SignIn from './src/components/Login';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={ store }>
        <View style={styles.container}>
          <SignIn />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#95a5a6',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50
  },
});
