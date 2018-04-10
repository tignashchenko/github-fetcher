import React, { Component } from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#95a5a6',
  },
  logoContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center'
  },
  logo: {
    width: 150,
    height: 150
  },
  appTitle: {
    color: '#fff',
    marginTop: 10,
    opacity: 0.8
  },
  signInButton: {
    backgroundColor: '#7f8c8d',
    marginTop: 15,
    borderRadius: 7,
  },
  signInButtonText: {
    color: '#fff',
    textAlign: 'center',
    padding: 5,
    opacity: 0.9
  }
});

export default class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuth: false,
      url: ''
    }
  }
  render() {
    const { navigation } = this.props;
    return (
      <View style={ styles.container }>
        <View style={ styles.logoContainer }>
          <Image 
            source={require('../../../public/assets/Octocat/Octocat.png')}
            style={ styles.logo } 
          />
          <Text style={ styles.appTitle }>An app for finding GitHub repositories</Text>
            <TouchableOpacity 
            style={ styles.signInButton }
            // onPress={() => navigation.navigate('Feed')}
            onPress={}
          >
            <Text style={ styles.signInButtonText }>Sign in with GitHub</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}