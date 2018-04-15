import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
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
  },
  validationError: {
    color: '#ff0000',
    marginBottom: 12
  }
});