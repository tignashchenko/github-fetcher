import React, { Component } from 'react';
import { StyleSheet, View, WebView } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default class Web_View extends Component {
  render() {
    const { params } = this.props.navigation.state;
    const url = params ? params.url : null;
    
    return (
      <View style={ styles.container }>
        <WebView url={ url } />
      </View>
    );
  }
}