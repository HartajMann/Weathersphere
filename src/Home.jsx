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
  Dimensions
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import * as Progress from 'react-native-progress';



const { width, height } = Dimensions.get('window');

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
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&forecast_days=14&hourly=temperature_2m,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,sunrise,precipitation_probability_max,sunset&timezone=auto`,
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
    return (
      <View style={styles.centeredContainer}>
        <Progress.CircleSnail size={100} thickness={10} color='#0bb3b2' />
      </View>
    );
  }

  const today = new Date().setHours(0, 0, 0, 0); 

const forecastData = weatherData.daily.time
  .map((time, index) => ({
    day: time,
    temperature_2m_max: weatherData.daily.temperature_2m_max[index],
    temperature_2m_min: weatherData.daily.temperature_2m_min[index],
    key: `${index}`,
  }))
  .filter(item => {
    const forecastDay = new Date(item.day).setHours(0, 0, 0, 0);
    return forecastDay > today;
  })
  .slice(0, 7);
  

  const renderHourlyForecastItem = ({ item }) => {
    // Format the time to a more human-readable format
    const formattedTime = new Date(item.time).toLocaleTimeString('en-US', {
      hour: 'numeric',
      hour12: true // Change this to false if you prefer 24-hour format
    });
  
    return (
      <View style={styles.hourlyItem}>
        <Text style={styles.hourlyText}>{formattedTime}</Text>
        <Text style={styles.hourlyText}>{Math.round(item.temperature_2m)}°C</Text>
      </View>
    );
  };
  

  const currentTime = new Date();

const hourlyForecastData =
  weatherData && weatherData.hourly
    ? weatherData.hourly.time.map((time, index) => ({
        time: time,
        temperature_2m: weatherData.hourly.temperature_2m[index],
        key: `${index}`,
      })).filter(({ time }) => {
        // Convert the time to a Date object and compare with the current time
        const forecastTime = new Date(time);
        const differenceInHours = (forecastTime - currentTime) / 1000 / 60 / 60;
        return differenceInHours >= 0 && differenceInHours <= 24;
      })
    : [];


    const renderForecastItem = ({ item }) => {
      let date = new Date(item.day);
      let options = { weekday: 'long' };
      let dayName = date.toLocaleDateString('en-US', options);
      dayName = dayName.split(',')[0];
    return (
      <View style={styles.outerday}>
      <View style={styles.day}>
        <Text style={styles.innerDay}>
          {dayName} 
        </Text>
        <Text style={styles.innerDay}>
        High: {Math.round(item.temperature_2m_max)}°
          Low: {Math.round(item.temperature_2m_min)}°
        </Text>
      </View>
      </View>
    );
  };
  function formatTime(isoString) {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        blurRadius={70}
        source={require('./assets/bg.png')}
        style={styles.image}>
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <View style={styles.container}>

            <Text style={styles.location}>My Location</Text>

            <Text style={styles.current}>
              {Math.round(weatherData.current_weather.temperature)}°C
            </Text>

            {weatherData.daily && (
              <View style={styles.highLowContainer}>
                <Text style={styles.highLow}>
                  High: {Math.round(weatherData.daily.temperature_2m_max[0])}°
                </Text>
                <Text style={styles.highLow}>
                  Low: {Math.round(weatherData.daily.temperature_2m_min[0])}°
                </Text>
              </View>
            )}
            { weatherData.daily && (<View style={styles.otherstatscontainer}>
              <View style={styles.otherstats}>
                <Image source={require('./assets/wind.png')} style={[styles.icon]} />
                <Text style={styles.otherstatstext}>{weatherData.current_weather ? `${Math.round(weatherData.current_weather.windspeed)} km/h` : 'Loading...'}</Text>
              </View>
              <View style={styles.otherstats}>
                <Image source={require('./assets/drop.png')} style={[styles.icon]} />
                <Text style={styles.otherstatstext}>
                {`${weatherData.daily.precipitation_probability_max[0]}%`}
                </Text>
              </View>
              <View style={styles.otherstats}>
                <Image source={require('./assets/sun.png')} style={[styles.icon]} />
                <Text style={styles.otherstatstext}>
                  {`${formatTime(weatherData.daily.sunrise[0])}`}
                </Text>
              </View>
            </View>
            )}
            <Text style={styles.textdays}>HOURLY FORECAST</Text>
            <FlatList 
              data={hourlyForecastData}
              renderItem={renderHourlyForecastItem}
              horizontal={true}
              keyExtractor={item => item.key}
            />
            <Text style={styles.textdays}>7-DAY FORECAST</Text>
            <FlatList scrollEnabled={false}
              data={forecastData}
              renderItem={renderForecastItem}
              keyExtractor={item => item.key}
            />

          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // This will ensure the container takes up all available space
    alignItems: 'center', // This will center your content horizontally
    justifyContent: 'center', // This will center your content vertically
    paddingVertical: 20, // Optional: If you want some space on the top and bottom
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
  },
  scrollViewContainer: {
    flexGrow: 1, // This will make sure the ScrollView content stretches to fit the space
    justifyContent: 'center', // This will center the content vertically
  },
  
  highLowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: 150,
  },
  otherstatscontainer: {
    flexDirection: 'row',
    justifyContent: 'between',
    marginTop: 10,
  },
  otherstats:
  {
    flexDirection: 'row',
    justifyContent: 'center',
    marginRight: 15,
  },
  otherstatstext: {
    color: 'white',
    fontSize: 20,
    marginTop: 2,
    marginLeft: 5,
    fontWeight: '500',
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

  icon: { width: 30, height: 30 },

  windIn: {
    color: 'black',
    fontSize: 40,
    textAlign: 'right',
  },

  location: {
    color: 'white',
    fontSize: 30,
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
    width: width, // Use the width from Dimensions
    height: height, // Use the height from Dimensions
  },
  current: {
    color: 'white',
    fontSize: 60,
  },
  highLow: {
    margin: 3,
    padding: 3,
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
  },

  outerday: {
    padding:3,
    borderRadius: 5,
  },
  day: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: width * 0.95, 
    padding: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'gray',
  },

  innerDay: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  
  },
  textdays:{
    color: 'white',
    fontSize: 15,
    fontWeight: '500',
    marginTop: 15,
    marginBottom : 10,
  },

  hourlyItem: {
    backgroundColor: 'rgba(255,255,255,0.3)', // Slightly transparent white
    borderRadius: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 15,
    paddingBottom: 15,  
    alignItems: 'center', // Center items horizontally
    justifyContent: 'center', // Center items vertically
    marginRight: 5, // Space between items
    marginLeft: 5, // Space between items
  },
  hourlyText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default Home;
