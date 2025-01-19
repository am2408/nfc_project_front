import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomePage from "./pages/HomePage";
import LockPage from "./pages/LockPage";
import Payment from "./pages/don/Payment";
import ConfirmPayment from "./pages/don/ConfirmPayment";
import Login from "./pages/Users/Login";
import Register from "./pages/Users/Register";
// import UpdateUser from "./pages/Users/UpdateUser";
// import UpdatePassword from "./pages/Users/UpdatePassword";
import User from "./pages/Users/User";
import userReducer from "./reducers/userReducer";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PersistGate } from "redux-persist/integration/react";
import { persistReducer, persistStore } from "redux-persist";
import { Provider } from "react-redux";
import { InactivityProvider } from "./context/InactivityContext";
import NfcManager, { NfcTech } from 'react-native-nfc-manager';
import { Alert } from 'react-native';
import Nfc from "./pages/Nfc";

const Stack = createStackNavigator();
const reducers = combineReducers({ userReducer });
const persistConfig = { key: "nfc", storage: AsyncStorage };

const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
const persistor = persistStore(store);
export default function App() {

const initializeNfc = async () => {
  try {
    // Initialiser le NFC Manager
    const result = await NfcManager.start();
    console.log('NFC Manager initialisé:', result);

    // Vérifier si NFC est supporté
    const isSupported = await NfcManager.isSupported();
    if (!isSupported) {
      Alert.alert('NFC non supporté', 'Votre appareil ne supporte pas NFC.');
      return;
    }

    // Vérifier si NFC est activé
    const isEnabled = await NfcManager.isEnabled();
    if (!isEnabled) {
      Alert.alert('NFC désactivé', 'Veuillez activer NFC dans vos paramètres.');
    }
  } catch (error) {
    console.error('Erreur d’initialisation NFC:', error);
  }
};

initializeNfc();

  return (
    <NavigationContainer>
      <InactivityProvider>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <Stack.Navigator initialRouteName="Nfc">
              <Stack.Screen
                name="Nfc"
                component={Nfc}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Lock"
                component={LockPage}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Home"
                component={HomePage}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Payment"
                component={Payment}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="ConfirmPayment"
                component={ConfirmPayment}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Register"
                component={Register}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="User"
                component={User}
                options={{ headerShown: false }}
              />
              {/* <Stack.Screen
              name="UpdateUser"
              component={UpdateUser}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="UpdatePassword"
              component={UpdatePassword}
              options={{ headerShown: false }}
            /> */}
            </Stack.Navigator>
          </PersistGate>
        </Provider>
      </InactivityProvider>
    </NavigationContainer>
  );
}
