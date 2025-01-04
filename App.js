import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './pages/HomePage';
import LockPage from './pages/LockPage';
import Payment from './pages/don/Payment';
import ConfirmPayment from './pages/don/ConfirmPayment';
import { InactivityProvider } from './context/InactivityContext';

const Stack = createStackNavigator();

export default function App() {


  return (

    <NavigationContainer>
      <InactivityProvider>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Lock" component={LockPage} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={HomePage} options={{ headerShown: false }} />
          <Stack.Screen name="Payment" component={Payment} options={{ headerShown: false }} />
          <Stack.Screen name="ConfirmPayment" component={ConfirmPayment} options={{ headerShown: false }} />
        </Stack.Navigator>
      </InactivityProvider>
    </NavigationContainer>

  );
}
