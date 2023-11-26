

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Home from './src/Home';
import Search from './src/Search';
import SettingsPage from './src/SettingsPage';


const Stack = createStackNavigator();




function App() {

  return(
    <NavigationContainer>

      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="SettingsPage" component={SettingsPage} />
      </Stack.Navigator>
    
    </NavigationContainer>

  )


}

export default App;