import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './pages/HomePage';
import LockPage from './pages/LockPage';
import Payement from './pages/Payement';

const Stack = createStackNavigator();

export default function App() {
  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName="Lock">
        <Stack.Screen name="Lock" component={LockPage} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomePage} options={{ headerShown: false }} />
        <Stack.Screen name="Payement" component={Payement} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}
