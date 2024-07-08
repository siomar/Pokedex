import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/Home';
import DetailScreen from './screens/Detail';
import CapturedScreen from './screens/Captured';
import SplashScreen from './screens/Splash';
import {colors} from './styles/theme';
import {ThemeProvider, DefaultTheme} from 'styled-components';
import Header from './components/Header';
import {Provider} from 'react-redux';
import {persistor, store} from './redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {RootStackParamList} from './types';
import Error from './components/Error';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation = () => (
  <NavigationContainer>
    <Error>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{header: props => <Header {...props} />}}
        />
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={{header: props => <Header {...props} />}}
        />
        <Stack.Screen
          name="Captured"
          component={CapturedScreen}
          options={{header: props => <Header {...props} />}}
        />
      </Stack.Navigator>
    </Error>
  </NavigationContainer>
);

const theme: DefaultTheme = {colors};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <Navigation />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
