import { StackNavigator } from 'react-navigation';
import Feed from '../components/Feed';
import SignIn from '../components/SignIn';
import Web from '../components/Web';

export default SignedIn = StackNavigator({
  Feed: {
    screen: Feed
  },
  Web: {
    screen: Web
  },
  SignIn: {
    screen: SignIn
  }
});