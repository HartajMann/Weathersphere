import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; // Make sure this import is included
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './src/Home';
import Search from './src/Search';
import SettingsPage from './src/SettingsPage';
import SavedLocationsPage from './src/SavedLocations';
import LocationWeatherDetails from './src/LocationWeatherDetails';
import Help from './src/Help';
import Contact from './src/Contact';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Search" component={Search} />
      <Drawer.Screen name="Saved" component={SavedLocationsPage} />
      <Drawer.Screen name="Settings" component={SettingsPage} />
    </Drawer.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Drawer" component={DrawerNavigator} />
        <Stack.Screen name="LocationWeatherDetails" component={LocationWeatherDetails} />
        <Stack.Screen name="Help" component={Help} />
        <Stack.Screen name="Contact" component={Contact} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
