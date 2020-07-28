import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import FaIcon from 'react-native-vector-icons/FontAwesome5';
import { Divider, Button, Text } from 'react-native-elements';

import SCREENS from './screens'

const dividerStyle = {
  backgroundColor: '#ccc',
  height: 2,
  marginTop: 10,
  marginBottom: 10
};

const DojoHomeButton = ({ iconName, iconColor, title, onPress }) => (
  <Button
    icon={<FaIcon
      name={iconName}
      size={30}
      style={styles.linkIcon}
      color={iconColor}
    />}
    iconRight
    buttonStyle={styles.button}
    containerStyle={styles.buttonContainer}
    type="outline"
    title={title}
    titleStyle={{
      fontSize: 30
    }}
    onPress={onPress}
  />
)
export default function DojoHomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.navigationContainer}>
        <DojoHomeButton
          title={"Learn"} 
          iconName={"play"}
          iconColor="#ff0000"
          onPress={() => navigation.navigate(SCREENS.DOJO_FREE_PLAY)}
        />
        <Divider style={dividerStyle} />
        <DojoHomeButton
          title={"Train"}
          iconName={"dumbbell"}
          iconColor="#888888"
          onPress={() => navigation.navigate(SCREENS.DOJO_TRAININGS)}
        />
        <Divider style={dividerStyle} />
        <DojoHomeButton
          title={"Challenge"}
          iconName={"crown"}
          iconColor="#FFCC44"
          onPress={() => navigation.navigate(SCREENS.DOJO_CHALLENGES)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pageHeading: {
    fontSize: 100
  },
  container: {
    padding: 10,
    flex: 1,
    justifyContent: 'space-between',
  },
  navigationContainer: {
    flex: 1,
    paddingVertical: 30,
    justifyContent: 'space-around',
    flexDirection: 'column',
    alignContent: 'center'
  },
  link: {
    height: 50,
    // alignContent: 'center',
    // textAlign: 'center',
    // backgroundColor: 'green',
    // justifyContent: 'space-between',
  },
  linkText: {
    fontSize: 50,
    alignContent: 'center',
    textAlign: 'center',
    // justifyContent: 'space-between',
  },
  linkIcon: {
    marginLeft: 20, 
  },
  button: {
    height: 100,
    fontSize: 100,
  },
});
