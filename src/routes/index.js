import { StackNavigator } from 'react-navigation';
import SignIn from '../components/SignIn';
import Feed from '../components/Feed';

export default Routes = StackNavigator({
  SignIn: { 
    screen: SignIn 
  },
  Feed: { 
    screen: Feed
  },
  initialRouteName: 'SignIn'
});