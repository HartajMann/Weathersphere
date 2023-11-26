import React, {
  useEffect,
  useState
} from 'react';
import {
  FlatList,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';

const cityCoordinates = [
  { id: '1', name: 'London', latitude: 51.5085, longitude: -0.1257 },
  { id: '2', name: 'New York', latitude: 56.25, longitude: -5.2833 },
  { id: '3', name: 'Paris', latitude: 48.8534, longitude: 2.3488 },
  { id: '4', name: 'Tokyo', latitude: 35.6895, longitude: 139.6917 },
  { id: '5', name: 'Berlin', latitude: 52.5244, longitude: 13.4105 },
];

const Day = ({ title, temp, tempMax, tempMin }) => (
  <View style={styles.cityDetails}>
    <Text style={styles.city}>City: {title}</Text>
    <Text style={styles.temp}> {temp}°C</Text>
    <Text style={styles.weatherInfo}>Max: {tempMax}°C</Text> 
    <Text style={styles.weatherInfo}>Min: {tempMin}°C</Text> 
  </View>
);

function Search() {

  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const weatherPromises = cityCoordinates.map(city =>
          fetch(`https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=1`)
            .then(response => response.json())
        );
        const weatherResults = await Promise.all(weatherPromises);
        const updatedWeatherData = weatherResults.map((result, index) => ({
          ...cityCoordinates[index],
          temp: result.current_weather.temperature,
          tempMax: result.daily.temperature_2m_max[0],
          tempMin: result.daily.temperature_2m_min[0],
        }));
        setWeatherData(updatedWeatherData);
      } catch (error) {
        console.error("Error fetching weather data: ", error);
      }
    };

    fetchWeatherData();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <ImageBackground source={require('./assets/Location.jpg')} style={{ width: '100%', height: '100%' }}>
          <View style={styles.container}>
            <Text style={styles.weather}>Weather</Text>
            <FlatList
              data={weatherData}
              renderItem={({ item }) => (
                <Day
                  title={item.name}
                  temp={item.temp}
                  tempMax={item.tempMax}
                  tempMin={item.tempMin}
                />
              )}
              keyExtractor={item => item.id}
            />
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  weather: {
    fontSize: 50,
    color: 'white',
  },
  search: {
    fontSize: 20,
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    textAlign: 'left',
    color: 'white',
    borderColor: 'white',
    borderWidth: 3,
    borderRadius: 10,
    padding: 5,
  },
  cityDetails: {
    backgroundColor: 'white',
    marginTop: 10,
    margin: 5,
    padding: 30,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 50,
    borderColor: 'black',
    borderWidth: 3,
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