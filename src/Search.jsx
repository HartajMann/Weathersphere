import React, { useState } from 'react';
import { TextInput, FlatList, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, View, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const WeatherInfo = ({ title, temperature, windSpeed }) => (
  <View style={styles.weatherDetails}>
    <Text style={styles.city}>City: {title}</Text>
    <Text style={styles.temp}>Temperature: {temperature}°C</Text>
    <Text style={styles.weatherInfo}>Wind Speed: {windSpeed} km/h</Text>
  </View>
);

function Search() {
  const [cityName, setCityName] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const getCoordinates = async (city) => {
    try {
      const response = await fetch(`https://geocode.maps.co/search?q=${city}`);
      const data = await response.json();

      // Assuming the first result is the most relevant one
      if (data && data.length > 0) {
        return { latitude: data[0].lat, longitude: data[0].lon };
      } else {
        throw new Error('Location not found');
      }
    } catch (error) {
      console.error("Error fetching coordinates: ", error);
      throw error;
    }
  };
  const saveLocation = async () => {
    try {
      const locationData = {
        name: cityName,
        latitude: weatherData.latitude,
        longitude: weatherData.longitude
      };
      const jsonValue = JSON.stringify(locationData);
      await AsyncStorage.setItem(`location_${cityName}`, jsonValue);
      alert('Location saved!');
    } catch (error) {
      console.error("Error saving location: ", error);
    }
  };
  const clearSearch = () => {
    setCityName('');
    setWeatherData(null);
  };


  const fetchWeatherData = async () => {
    try {
      const { latitude, longitude } = await getCoordinates(cityName);

      const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
      const data = await response.json();

      setWeatherData({
        name: cityName,
        temperature: data.current_weather.temperature,
        windSpeed: data.current_weather.windspeed,
      });
    } catch (error) {
      console.error("Error fetching weather data: ", error);
      setWeatherData(null); // Reset data in case of an error
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <ImageBackground source={require('./assets/Location.jpg')} style={{ width: '100%', height: '100%' }}>
          <View style={styles.container}>
            <Text style={styles.header}>Weather Search</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Enter City Name"
              value={cityName}
              onChangeText={setCityName}
            />
            <Button title="Search" onPress={fetchWeatherData} />
            {weatherData && (
              <>
                <WeatherInfo
                  title={weatherData.name}
                  temperature={weatherData.temperature}
                  windSpeed={weatherData.windSpeed}
                />
                <Button title="Save Location" onPress={saveLocation} />
              </>
            )}
            <Button title="Clear" onPress={clearSearch} />
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 50,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    color: 'black',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  weatherDetails: {
    backgroundColor: 'white',
    marginTop: 10,
    marginHorizontal: 10,
    padding: 30,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
  },
  city: {
    fontSize: 20,
    textAlign: 'left',
    color: 'black',
    fontWeight: 'bold',
  },
  temp: {
    fontSize: 35,
    textAlign: 'left',
    color: 'black',
  },
  weatherInfo: {
    fontSize: 15,
    textAlign: 'left',
    color: 'black',
  },
});

export default Search;
