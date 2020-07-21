import React from 'react';
import { Button } from 'react-native-elements';
import FaIcon from 'react-native-vector-icons/FontAwesome5';

const SettingsButton = ({ navigation }) => {
  return (<Button
    type="outline"
    icon={
      <FaIcon
        name="cog"
        size={15}
        style={{
          marginRight: 5,
        }}
      />
    }
    containerStyle={{
      marginRight: 10,
      paddingVertical: 5,
    }}
    titleStyle={{
      fontSize: 15,
      padding: 0
    }}
    buttonStyle={{
      padding: 5,
    }}
    onPress={() => navigation.push('Settings')}
    title="Settings"
  />)
}

export default SettingsButton
