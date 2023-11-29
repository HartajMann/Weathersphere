
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

function Help() {
    return (
        
        <ScrollView style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Weather App Help</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.question}>How to check the weather for a specific location?</Text>
                <Text style={styles.answer}>
                    To check the weather for a specific location, go to the search tab and enter the name of the location. The app will display the current weather conditions and forecast.
                </Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.question}>Can I save my favorite locations?</Text>
                <Text style={styles.answer}>
                    Yes, you can save your favorite locations by adding the  location name. These locations will be easily accessible in the saved locations tab.
                </Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.question}>How do I view the 7-day weather forecast?</Text>
                <Text style={styles.answer}>
                    To view the 7-day forecast, simply select any location either from your favorites or by searching for a new one. The app will display the current weather along with a detailed forecast for the next 7 days.
                </Text>
            </View>
            
            
        </ScrollView>
        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    headerContainer: {
        padding: 20,
        backgroundColor: '#007bff',
        alignItems: 'center',
    },
    headerText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    section: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    question: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    answer: {
        fontSize: 16,
    },
});

export default Help;
