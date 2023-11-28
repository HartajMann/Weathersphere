import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, ImageBackground, FlatList } from 'react-native';

function LocationWeatherDetails({ route }) {
  const { location } = route.params;
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
        try {
          const url = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current_weather=true&hourly=temperature_2m,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto`;
          console.log("Fetching weather data from:", url); // For debugging
          const response = await fetch(url);
          const data = await response.json();
          console.log('Weather data:', data);
          setWeatherData(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      

    fetchWeatherData();
  }, [location]);

  if (!weatherData) {
    return <Text>Loading...</Text>;
  }

  // For debugging, let's log and display some basic data
  console.log('Current weather:', weatherData.current_weather);

  return (
    <SafeAreaView style={styles.container}>
      <Text>Weather Data Loaded</Text>
      <Text>Temperature: {weatherData.current_weather ? weatherData.current_weather.temperature : 'N/A'}°C</Text>
      {/* Temporarily comment out the detailed rendering logic */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  
    button: {
      backgroundColor: 'red',
      borderRadius: 25,
      padding: 10,
      elevation: 2,
      marginBottom: 10,
    },
  
    windBg: {
      backgroundColor: '#ADD8E6',
      width: 350,
      height: 150,
      borderRadius: 30,
      borderColor: 'white',
      borderWidth: 2,
      alignItems: 'center',
      padding: 5,
    },
  
    wind: {
      fontSize: 20,
      color: 'black',
    },
  
    icon: { width: 50, height: 50 },
  
    windIn: {
      color: 'black',
      fontSize: 40,
      textAlign: 'right',
    },
  
    location: {
      color: 'white',
      fontSize: 30,
      marginTop: 30,
    },
  
    city: {
      color: 'white',
      fontSize: 15,
      marginTop: 5,
    },
  
    image: {
      flex: 1,
      height: 1000,
      width: 450,
      resizeMode: 'cover',
      alignItems: 'center',
    },
    current: {
      marginTop: 10,
      marginRight: 10,
      color: 'white',
      fontSize: 60,
    },
    highLow: {
      margin: 3,
  
      color: 'white',
      fontSize: 15,
    },
    day: {
      marginTop: 4,
      backgroundColor: 'rgba(0,0,0,0.5)',
      width: 350,
      marginRight: 30,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      borderColor: 'white',
      borderWidth: 2,
    },
  
    innerDay: {
      color: 'white',
      fontSize: 15,
    },
  
    hourlyItem: {
      backgroundColor: 'rgba(255,255,255,0.8)',
      borderRadius: 10,
      padding: 10,
      margin: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    hourlyText: {
      fontSize: 12,
      color: 'black',
    },
  });

export default LocationWeatherDetails;
