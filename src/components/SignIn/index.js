import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { Buffer } from 'buffer';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#95a5a6',
  },
  input: {
    width: 200,
    height: 30,
    marginBottom: 5,
    backgroundColor: '#ecf0f1',
    color: 'black',
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
    marginBottom: 10,
    opacity: 0.8
  },
  signInButton: {
    backgroundColor: '#7f8c8d',
    marginTop: 10,
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
      username: '',
      password: '',
      twoFA: ''
    }
  }

  onChangePassword = (text) => {
    this.setState({
      password: text
    })
  }

  onChangeUsername = (text) => {
    this.setState({
      username: text
    });
  }
  render() {
    const { password, username } = this.state;
    const { navigation } = this.props;
    return (
      <View style={ styles.container }>
        <View style={ styles.logoContainer }>
          <Image 
            source={ require('../../../public/assets/Octocat/Octocat.png') }
            style={ styles.logo } 
          />
          <Text style={ styles.appTitle }>An app for finding GitHub repositories</Text>
          <TextInput
            autoCapitalize={ 'none' }
            maxLength={ 30 }
            onChangeText={ this.onChangeUsername }
            textAlign={ 'left' } 
            value={ username }
            style={ styles.input } 
          />
          <TextInput
            autoCapitalize={ 'none' }
            maxLength={ 30 }
            onChangeText={ this.onChangePassword }
            textAlign={ 'center' } 
            value={ password }
            style={ styles.input } 
          />
          <TouchableOpacity 
            style={ styles.signInButton }
            // onPress={() => navigation.navigate('Feed')}
            onPress={() => {
              const password = String.raw`))q%hUx3G\D]]ugx`;
              const headers = {
                Authorization: `Basic ${new Buffer(`tignashchenko@gmail.com:${password}`).toString('base64')}`,
                'X-GitHub-OTP': 668976
              };
              console.log(headers);
              fetch(`https://api.github.com/user`, {
                headers, 
              })
                .then(res => {
                  // if (res.status === 200 && res.url) {
                  //   this.setState({
                  //     isAuth: true,
                  //     url: res.url
                  //   })
                  // }
                  console.log(res);
                })
            }}
          >
            <Text style={ styles.signInButtonText }>Sign in with GitHub</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}