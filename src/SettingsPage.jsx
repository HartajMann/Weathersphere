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
