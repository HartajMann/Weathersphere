/* eslint-disable react-native/no-inline-styles */
import { Avatar, Icon, ListItem, Switch } from '@rneui/themed';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View
} from 'react-native';

function SettingsPage() {
  return (
    <SafeAreaView>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Icon name="keyboard-return" size={30} />
        <Text style={styles.headerText}>Settings</Text>
      </View>
      {/* User Details */}
      <ListItem bottomDivider>
        <Avatar
          size={100}
          rounded
          title="HM"
          containerStyle={{backgroundColor: 'gray'}}
        />
        <ListItem.Content>
          <ListItem.Title>Hartaj Mann</ListItem.Title>
          <ListItem.Subtitle>abc@gmail.com</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>

      {/* Favourite Locations */}
      <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title>Saved Locations</ListItem.Title>
        </ListItem.Content>
      </ListItem>

      {/* Temperature */}
      <ListItem bottomDivider>
        <ListItem.Content
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <ListItem.Title>Temperature</ListItem.Title>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{marginRight: 10}}>*C</Text>
            <Switch value={false} />
            <Text style={{marginLeft: 10}}>*F</Text>
          </View>
        </ListItem.Content>
      </ListItem>

      {/* Wind Speed */}
      <ListItem bottomDivider>
        <ListItem.Content
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <ListItem.Title>Wind Speed</ListItem.Title>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{marginRight: 10}}>Km/h</Text>
            <Switch value={true} />
            <Text style={{marginLeft: 10}}>Mph</Text>
          </View>
        </ListItem.Content>
      </ListItem>

      {/* Privacy Policy */}
      <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title>Privacy Policy</ListItem.Title>
        </ListItem.Content>
      </ListItem>

      {/* Help */}
      <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title>Help</ListItem.Title>
        </ListItem.Content>
      </ListItem>

      {/* Log Out */}
      <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title>Log out</ListItem.Title>
        </ListItem.Content>
      </ListItem>

      {/* Version */}
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>Version 1.0.0</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e1e1e1',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  headerText: {
    fontSize: 24,
    marginLeft: 5,
  },
  footerContainer: {
    padding: 15,
    borderTopWidth: 1,
    borderColor: '#e1e1e1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    fontSize: 14,
    color: 'gray',
  },
});

export default SettingsPage;
