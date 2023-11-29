import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  ImageBackground,
  FlatList,
} from 'react-native';

function LocationWeatherDetails({ route }) {
  const { location } = route.params;
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current_weather=true&hourly=temperature_2m,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto`,
        );
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchWeatherData();
  }, [location]);

  if (!weatherData) {
    return <Text>Loading...</Text>;
  }

  // Prepare data for rendering
  const hourlyForecastData = weatherData.hourly ? weatherData.hourly.time.map((time, index) => ({
    time: time,
    temperature: weatherData.hourly.temperature_2m[index],
    key: `hourly-${index}`,
  })) : [];

  const dailyForecastData = weatherData.daily ? weatherData.daily.time.map((time, index) => ({
    day: time,
    maxTemp: weatherData.daily.temperature_2m_max[index],
    minTemp: weatherData.daily.temperature_2m_min[index],
    key: `daily-${index}`,
  })) : [];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.container}>
          <ImageBackground
            source={require('./assets/Background-current.jpg')} // Replace with your own image
            style={styles.image}>
            <Text style={styles.location}>{location.name}</Text>
            <Text style={styles.current}>
              {weatherData.current_weather.temperature}°C
            </Text>

            <View style={styles.forecastContainer}>
              <Text style={styles.forecastTitle}>Hourly Forecast</Text>
              <FlatList
                data={hourlyForecastData}
                renderItem={({ item }) => (
                  <View style={styles.forecastItem}>
                    <Text style={styles.forecastText}>{item.time}: {item.temperature}°C</Text>
                  </View>
                )}
                horizontal
                keyExtractor={item => item.key}
              />
            </View>

            <View style={styles.forecastContainer}>
              <Text style={styles.forecastTitle}>Daily Forecast</Text>
              <FlatList
                data={dailyForecastData}
                renderItem={({ item }) => (
                  <View style={styles.forecastItem}>
                    <Text style={styles.forecastText}>{item.day}: High {item.maxTemp}°C, Low {item.minTemp}°C</Text>
                  </View>
                )}
                keyExtractor={item => item.key}
              />
            </View>
          </ImageBackground>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  location: {
    fontSize: 30,
    color: 'white',
    marginTop: 20,
  },
  current: {
    fontSize: 40,
    color: 'white',
    marginVertical: 10,
  },
  forecastContainer: {
    width: '100%',
    paddingVertical: 10,
  },
  forecastTitle: {
    fontSize: 20,
    color: 'white',
    marginBottom: 10,
  },
  forecastItem: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 10,
  },
  forecastText: {
    fontSize: 15,
    color: 'black',
  },
  // Add more styles as needed
});

export default LocationWeatherDetails;
