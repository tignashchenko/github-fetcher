import React, { Component } from 'react';
import {
  AsyncStorage,
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Buffer } from 'buffer';
import CheckBox from 'react-native-check-box';
import authActions from '../../actions/authActions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#95a5a6',
  },
  input: {
    width: 200,
    height: 40,
    marginBottom: 5,
    paddingLeft: 5,
    backgroundColor: '#ecf0f1',
    color: 'black',
    textAlignVertical: 'top',
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
  },
  twoFA: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  twoFATitle: {
    paddingRight: 3,
    color: '#fff',
    opacity: 0.7
  }
});

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
    const { actions, navigation } = this.props;
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
            underlineColorAndroid='rgba(0,0,0,0)' 
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
          />
          <View style={ styles.twoFA }>
            <Text style={ styles.twoFATitle }>Two-Factor Authentication</Text>
            <CheckBox
              onClick={ this.handleTwoFAStatus }
              isChecked={ twoFA } 
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
      </View>
    )
  }
}

const mapStateToProps = ({ auth: { signedIn } }) => ({ signedIn });

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ ...authActions }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);