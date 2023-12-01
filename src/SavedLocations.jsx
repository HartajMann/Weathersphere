import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Dimensions,
    ImageBackground,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

function SavedLocationsPage({ navigation }) {
  const [savedLocations, setSavedLocations] = useState([]);

  const loadSavedLocations = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const locationKeys = keys.filter(key => key.startsWith('location_'));
      const locationObjects = await AsyncStorage.multiGet(locationKeys);
      const locations = locationObjects.map(([key, value]) => JSON.parse(value));
      setSavedLocations(locations);
    } catch (error) {
      Alert.alert('Error', 'Error loading saved locations.');
    }
  };

  useEffect(() => {
    loadSavedLocations();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadSavedLocations();
    }, [])
  );

  const viewWeatherDetails = location => {
    navigation.navigate('LocationWeatherDetails', { location });
  };

  const deleteLocation = async locationName => {
    try {
      await AsyncStorage.removeItem(`location_${locationName}`);
      loadSavedLocations(); // Reload locations after deletion
    } catch (error) {
      Alert.alert('Error', 'Error deleting location.');
    }
  };

  const renderLocationItem = ({ item }) => (
    <View style={styles.locationItem}>
      <TouchableOpacity onPress={() => viewWeatherDetails(item)} style={styles.locationInfo}>
        <Text style={styles.locationText}>{(item.name).toUpperCase()}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => deleteLocation(item.name)} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
    <ImageBackground
        blurRadius={70}
        source={require('./assets/bg.png')}
        style={styles.image}>
      <FlatList
        data={savedLocations}
        renderItem={renderLocationItem}
        keyExtractor={item => item.name}
        style={styles.list}
      />
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  list: {
    padding: 10,
  },
  image: {
    flex: 1,
    width: width, 
    height: height, 
  },
  locationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 15,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  locationInfo: {
    flex: 1,
  },
  locationText: {
    fontSize: 18,
    color: '#333',
  },
  deleteButton: {
    backgroundColor: '#136182',
    padding: 10,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
  },
  deleteButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
});

export default SavedLocationsPage;
