import React from 'react';
import { Button, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

function Contact() {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Contact Us</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.title}>Get in Touch</Text>
                <Text style={styles.text}>
                    If you have any questions, suggestions, or need support, feel free to reach out to us.
                </Text>

                <Text style={styles.subtitle}>Contact Information</Text>
                <TouchableOpacity onPress={() => console.log('Dialing Support')}>
                    <Text style={styles.contactInfo}>Support Helpline: +1-234-567-8900</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => console.log('Emailing Support')}>
                    <Text style={styles.contactInfo}>Email: support@example.com</Text>
                </TouchableOpacity>

                <Text style={styles.subtitle}>Send Us a Message</Text>
                <TextInput 
                    style={styles.input} 
                    placeholder="Your Name" 
                />
                <TextInput 
                    style={styles.input} 
                    placeholder="Your Email" 
                    keyboardType="email-address" 
                />
                <TextInput 
                    style={[styles.input, styles.textArea]} 
                    placeholder="Your Message" 
                    multiline={true} 
                    numberOfLines={4} 
                />
                <Button 
                    title="Send Message" 
                    onPress={() => console.log('Message Sent')} 
                />
            </View>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        padding: 20,
        backgroundColor: '#007bff',
        alignItems: 'center',
    },
    headerText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    content: {
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        marginBottom: 15,
        borderRadius: 5,
    },
    textArea: {
        height: 100,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
    contactInfo: {
        fontSize: 16,
        marginBottom: 10,
        color: '#007bff',
    },
});

export default Contact;
