import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import SplashScreen from './src/screens/SplashScreen';
import login from './src/screens/login';
import lnf from './src/screens/lnf'
import Home from './src/screens/Home';
import Detail1 from './src/screens/Detail';
import Detail2 from './src/screens/Detail2';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="login" component={login}/>
        <Stack.Screen name="lnf" component={lnf}/>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Detail1" component={Detail1} />
        <Stack.Screen name="Detail2" component={Detail2} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
