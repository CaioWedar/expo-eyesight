import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import './src/i18n';
import ModelProvider from './src/hooks/useModel';
import WelcomeScreen from './src/screens/Welcome';
import CameraScreen from './src/screens/Camera';

export type RootStackNavigatorParams = {
  Welcome: undefined;
  Camera: undefined;
};

export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <ModelProvider>
          <StatusBar
            barStyle="dark-content"
            translucent
            backgroundColor="transparent"
          />
          <Stack.Navigator
            screenOptions={{
              header: () => <></>,
            }}
          >
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Camera" component={CameraScreen} />
          </Stack.Navigator>
        </ModelProvider>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}
