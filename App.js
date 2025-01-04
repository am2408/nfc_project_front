import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './pages/HomePage';
import LockPage from './pages/LockPage';
import Payment from './pages/Payment';
import ConfirmPayment from './pages/ConfirmPayment';

const Stack = createStackNavigator();

export default function App() {
  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName="Lock">
        <Stack.Screen name="Lock" component={LockPage} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomePage} options={{ headerShown: false }} />
        <Stack.Screen name="Payment" component={Payment} options={{ headerShown: false }} />
        <Stack.Screen name="ConfirmPayment" component={ConfirmPayment} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}
