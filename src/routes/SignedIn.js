import { StackNavigator } from 'react-navigation';
import Feed from '../components/Feed';
import SignIn from '../components/SignIn';

export default SignedIn = StackNavigator({
  Feed: {
    screen: Feed
  },
  SignIn: {
    screen: SignIn
  }
});