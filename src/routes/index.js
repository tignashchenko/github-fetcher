import { StackNavigator } from 'react-navigation';
import SignIn from '../components/SignIn';
import Feed from '../components/Feed';
import Web from '../components/Web';

export default Routes = StackNavigator({
  SignIn: { 
    screen: SignIn 
  },
  Feed: { 
    screen: Feed
  },
  Web: {
    screen: Web
  },
  initialRouteName: 'SignIn'
});