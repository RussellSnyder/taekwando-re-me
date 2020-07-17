import React from 'react';
import { Button } from 'react-native';

const SettingsButton = ({ navigation }) => {
  return (<Button
    onPress={() => navigation.navigate('Settings')}
    title="Settings"
  />)
}

export default SettingsButton
