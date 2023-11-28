import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './src/Home';
import Search from './src/Search';
import SettingsPage from './src/SettingsPage';

const Drawer = createDrawerNavigator(); 

function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Search" component={Search} />
        <Drawer.Screen name="Settings" component={SettingsPage} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
