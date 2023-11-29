import React, { useEffect, useState } from 'react';
import {
  Button,
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  Platform,
  Alert,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import * as Progress from 'react-native-progress';



function Home({ navigation }) {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  async function requestPermissions() {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Access Required',
          message: 'This app needs to access your location',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }

    return false;
  }

  async function fetchWeatherData(latitude, longitude) {
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto`,
      );
      const data = await response.json();
      setWeatherData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setLoading(false);
    }
  }

  useEffect(() => {
    async function getLocationAndFetchWeather() {
      const hasPermission = await requestPermissions();
      if (!hasPermission) {
        Alert.alert(
          'Permission Denied',
          'You need to grant location permissions to use this feature.',
        );
        setLoading(false);
        return;
      }

      Geolocation.getCurrentPosition(
        position => {
          fetchWeatherData(position.coords.latitude, position.coords.longitude);
          console.log('Location fetched');
        },
        error => {
          console.error('Location error:', error);
          setLoading(false);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );
      
    }

    getLocationAndFetchWeather();
  }, []);

  if (!weatherData) {
    return <View style={styles.centeredContainer}><Progress.CircleSnail  size={100} thickness={10} color='#0bb3b2' />
    </View>
  }

  const forecastData = weatherData.daily.time.map((time, index) => ({
    day: time,
    temperature_2m_max: weatherData.daily.temperature_2m_max[index],
    temperature_2m_min: weatherData.daily.temperature_2m_min[index],

    key: `${index}`,
  }));

  const renderHourlyForecastItem = ({ item }) => {
    return (
      <View style={styles.hourlyItem}>
        <Text style={styles.hourlyText}>Time: {item.time}</Text>
        <Text style={styles.hourlyText}>Temp: {item.temperature_2m}°C</Text>
      </View>
    );
  };

  const hourlyForecastData =
    weatherData && weatherData.hourly
      ? weatherData.hourly.time.map((time, index) => ({
        time: time,
        temperature_2m: weatherData.hourly.temperature_2m[index],
        key: `${index}`,
      }))
      : [];

  const renderForecastItem = ({ item }) => {
    return (
      <View style={styles.day}>
        <Text style={styles.innerDay}>
          {item.day} High: {item.temperature_2m_max}° Low:{' '}
          {item.temperature_2m_min}°
        </Text>
      </View>
    );
  };
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <ImageBackground
          blurRadius={70}
            source={require('./assets/bg.png')}
            style={styles.image}>
            <Text style={styles.location}>My Location</Text>

            <Text style={styles.current}>
              {weatherData.current_weather.temperature}°C
            </Text>

            {weatherData.daily && (
              <View style={styles.highLowContainer}>
                <Text style={styles.highLow}>
                  High: {weatherData.daily.temperature_2m_max[0]}°C
                </Text>
                <Text style={styles.highLow}>
                  Low: {weatherData.daily.temperature_2m_min[0]}°C
                </Text>
              </View>
            )}

            <FlatList
              data={hourlyForecastData}
              renderItem={renderHourlyForecastItem}
              horizontal={true}
              keyExtractor={item => item.key}
            />

            <FlatList
              data={forecastData}
              renderItem={renderForecastItem}
              keyExtractor={item => item.key}
            />
            <View style={styles.windBg}>
              <Text style={styles.wind}>Wind</Text>
              <Image
                source={require('./assets/wind.png')}
                style={[styles.icon]}
              />

<Text style={styles.windIn}>
  {weatherData.current_weather ? `${weatherData.current_weather.windspeed} km/h` : 'Loading...'}
</Text>

            </View>

            <Text
              style={{ color: 'white', justifyContent: 'center', fontSize: 15 }}>
              The information showed is from City of Calgary
            </Text>
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

 centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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

export default Home;
