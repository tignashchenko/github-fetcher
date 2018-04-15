import React, { Component } from 'react';
import {
  AsyncStorage,
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Buffer } from 'buffer';
import CheckBox from 'react-native-check-box';
import { bool, object } from 'prop-types';

import authActions from '../../actions/authActions';
import styles from './styles';

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      twoFA: false,
      twoFAText: ''
    }
  }

  handleTwoFAStatus = () => {
    this.setState(prevState => ({
      twoFA: !prevState.twoFA
    }))
  }

  handleTwoFAText = (text) => {
    this.setState({
      twoFAText: text
    })
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
    const { password, twoFA, twoFAText, username } = this.state;
    const { actions, navigation, signedIn } = this.props;
    return (
      <KeyboardAvoidingView 
        behavior='padding'
        keyboardVerticalOffset={ 65 } 
        style={ styles.container }
      >
        <View style={ styles.logoContainer }>
          <Image 
            source={ require('../../../public/assets/Octocat/Octocat.png') }
            style={ styles.logo } 
          />
          <Text style={ styles.appTitle }>An app for finding GitHub repositories</Text>
          { signedIn === false ? <Text style={ styles.validationError }>PLEASE ENTER VALID CREDENTIALS</Text> : null }
          <TextInput
            autoCapitalize={ 'none' }
            maxLength={ 30 }
            onChangeText={ this.onChangeUsername }
            textAlign={ 'left' } 
            value={ username }
            style={ styles.input }
            underlineColorAndroid='rgba(0,0,0,0)'
            placeholder={'Username...'}  
          />
          <TextInput
            autoCapitalize={ 'none' }
            maxLength={ 30 }
            onChangeText={ this.onChangePassword }
            textAlign={ 'left' } 
            value={ password }
            secureTextEntry={ true }
            style={ styles.input }
            underlineColorAndroid='rgba(0,0,0,0)'
            placeholder={'Password...'} 
          />
          <View style={ styles.twoFA }>
            <Text style={ styles.twoFATitle }>Two-Factor Authentication</Text>
            <CheckBox
              isChecked={ twoFA } 
              onClick={ this.handleTwoFAStatus }
            />
          </View>
          { twoFA
            ? <TextInput
              autoCapitalize={ 'none' }
              maxLength={ 30 }
              onChangeText={ this.handleTwoFAText }
              textAlign={ 'left' } 
              value={ twoFAText }
              style={ styles.input }
              underlineColorAndroid='rgba(0,0,0,0)' 
            />
            : null
          }  
          <TouchableOpacity 
            style={ styles.signInButton }
            onPress={() => {
              let userPassword = password.toString();
              const headers = {
                Authorization: `Basic ${new Buffer(`${username}:${userPassword}`).toString('base64')}`,
              };

              { twoFA ? headers['X-GitHub-OTP'] = twoFAText : null }

              actions.signIn();

              fetch(`https://api.github.com/user`, {
                headers, 
              })
                .then(res => {
                  if (res.status === 200) {
                    actions.signInSuccess();
                    (async function() {
                      await AsyncStorage.setItem('signedIn', JSON.stringify(true));
                    })();
                    navigation.navigate('Feed');
                  } else {
                    actions.signInFailure();
                    return;
                  }
                })
            }}
          >
            <Text style={ styles.signInButtonText }>Sign in with GitHub</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    )
  }
}

SignIn.propTypes = {
  actions: object,
  navigation: object,
  signedIn: bool
};

const mapStateToProps = ({ auth: { isSigningIn, signedIn } }) => ({ isSigningIn, signedIn });

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ ...authActions }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);