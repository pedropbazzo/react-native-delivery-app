import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';
import { setCustomView, setCustomTextInput, setCustomText, setCustomImage, setCustomTouchableOpacity } from 'react-native-global-props';
import { Platform } from 'react-native';
import Variables from './styles/Variables';
import SignInScreen from './screens/SignInScreen';
import AuthLoadingScreen from './screens/AuthLoadingScreen';
import DashboardScreen from './screens/DashboardScreen';
import TripScreen from './screens/TripScreen';
import StopScreen from './screens/StopScreen';
import DocumentScreen from './screens/DocumentScreen';

const customTextProps = {
  style: {
    fontSize: 18,
    fontFamily: Platform.OS === 'ios' ? 'HelveticaNeue' : 'Roboto',
    color: Variables.colorDarkGray
  }
};

setCustomText(customTextProps);

const AppStack = createStackNavigator({
  Dashboard: DashboardScreen,
  Trip: TripScreen,
  Stop: StopScreen,
  Document: DocumentScreen
});
const AuthStack = createStackNavigator({ SignIn: SignInScreen });

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));