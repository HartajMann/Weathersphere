import React, { useState } from 'react';
import {
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

function Search() {
  const [cityName, setCityName] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const getCoordinates = async (city) => {
    try {
      const response = await fetch(`https://geocode.maps.co/search?q=${city}`);
      const data = await response.json();

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
  const handleSearch = async () => {
    if (cityName.trim()) {
      try {
        const coordinates = await getCoordinates(cityName);
        await fetchWeatherData(coordinates);
      } catch (error) {
        Alert.alert("Error", error.message);
      }
    }
  };
  const saveLocation = async () => {
    try {
      const { latitude, longitude } = await getCoordinates(cityName);
  
      const locationData = {
        name: cityName,
        latitude: latitude,
        longitude: longitude
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
      setWeatherData(null); 
    }
  };

  return (
    <SafeAreaView style={styles.flexContainer}>
      <ImageBackground
        blurRadius={70}
        source={require('./assets/bg.png')} 
        style={styles.imageBackground}
      >
        <View style={styles.contentContainer}>
          <Text style={styles.header}>Search Location</Text>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Enter City Name"
              placeholderTextColor="#AAA"
              value={cityName}
              onChangeText={setCityName}
            />
            <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
              <Text style={styles.searchButtonText}>Search</Text>
            </TouchableOpacity>
          </View>
          {weatherData && (
            <View style={styles.weatherDetails}>
              <Text style={styles.city}>City: {weatherData.name.toUpperCase()}</Text>
              <Text style={styles.temp}>Temperature: {Math.round(weatherData.temperature)}°C</Text>
              <Text style={styles.weatherInfo}>Wind Speed: {Math.round(weatherData.windSpeed)} km/h</Text>
              <TouchableOpacity style={styles.saveButton} onPress={saveLocation}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          )}
          <TouchableOpacity style={styles.clearButton} onPress={clearSearch}>
            <Text style={styles.clearButtonText}>Clear</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
  imageBackground: {
    width: width,
    height: height,
    paddingTop: 80, 
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    color: '#FFF',
    fontWeight: '700',
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#136182', 
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginTop: 15,
  },
    saveButtonText:{
      color: '#FFF',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 25,
  },
  searchInput: {
    flex: 1,
    height: 50,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#FFF',
  },
  searchButton: {
    padding: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
  },
  searchButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  weatherDetails: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 20,
    width: '100%',
    marginVertical: 20,
  },
  city: {
    fontSize: 22,
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  temp: {
    fontSize: 20,
    color: '#333',
    marginBottom: 5,
  },
  weatherInfo: {
    fontSize: 18,
    color: '#333',
  },
  clearButton: {
    backgroundColor: '#6994D6', 
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginTop: 10,
  },
  clearButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  icon: { width: 40, height: 40, 
  marginRight: 10,},
});

export default Search;