import { StackNavigator } from 'react-navigation';
import SignIn from '../components/SignIn';
import Feed from '../components/Feed';
import Web from '../components/Web';

export default Routes = StackNavigator({
  Feed: { 
    screen: Feed
  },
  SignIn: { 
    screen: SignIn 
  },
  Web: {
    screen: Web
  }
});