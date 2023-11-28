import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Button, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import LocationWeatherDetails from './LocationWeatherDetails';

function SavedLocationsPage({ navigation }) {
  const [savedLocations, setSavedLocations] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState(new Set());

  // Define loadSavedLocations outside of the useEffect and useFocusEffect
  const loadSavedLocations = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const locationKeys = keys.filter(key => key.startsWith('location_'));
      const locationObjects = await AsyncStorage.multiGet(locationKeys);
      const locations = locationObjects.map(([key, value]) => JSON.parse(value));
      setSavedLocations(locations);
    } catch (error) {
      console.error('Error loading saved locations: ', error);
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

  const viewWeatherDetails = (location) => {
    navigation.navigate('LocationWeatherDetails', { location });
  };
  
  

        const deleteSelectedLocations = async () => {
            try {
                const keysToDelete = Array.from(selectedLocations).map(locationName => `location_${locationName}`);
                await AsyncStorage.multiRemove(keysToDelete);
                setSelectedLocations(new Set());
                loadSavedLocations(); // Reload locations after deletion
            } catch (error) {
                console.error('Error deleting locations: ', error);
            }
        };

        const toggleSelection = (locationName) => {
            const newSelectedLocations = new Set(selectedLocations);
            if (newSelectedLocations.has(locationName)) {
                newSelectedLocations.delete(locationName);
            } else {
                newSelectedLocations.add(locationName);
            }
            setSelectedLocations(newSelectedLocations);
        };

        const renderLocationItem = ({ item }) => (
            <TouchableOpacity
                onPress={() => viewWeatherDetails(item)}
                onLongPress={() => toggleSelection(item.name)}
                style={selectedLocations.has(item.name) ? styles.selectedLocationItem : styles.locationItem}
            >
                <Text>{item.name}</Text>
            </TouchableOpacity>
        );

        return (
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={savedLocations}
                    renderItem={renderLocationItem}
                    keyExtractor={item => item.name}
                />
                <Button title="Delete Selected" onPress={deleteSelectedLocations} />
            </SafeAreaView>
        );
    }

const styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        locationItem: {
            padding: 20,
            borderBottomWidth: 1,
            borderBottomColor: '#ddd',
        },
        selectedLocationItem: {
            padding: 20,
            borderBottomWidth: 1,
            borderBottomColor: '#ddd',
            backgroundColor: '#e0e0e0',
        },
    });

    export default SavedLocationsPage;
