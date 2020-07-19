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

export default function DojoHomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.navigationContainer}>
        <Button
          icon={<FaIcon
            name="play"
            size={30}
            style={styles.linkIcon}
          />}
          iconRight
          buttonStyle={styles.button}
          containerStyle={styles.buttonContainer}
          type="outline"
          title="Free Play"
          titleStyle={{
            fontSize: 30
          }}
          onPress={() => navigation.navigate(SCREENS.DOJO_FREE_PLAY)}
        />
        <Divider style={dividerStyle} />
        <Button
          icon={<FaIcon name="dumbbell" size={30} style={styles.linkIcon}/>}
          iconRight
          buttonStyle={styles.button}
          containerStyle={styles.buttonContainer}
          type="outline"
          title="Train"
          titleStyle={{
            fontSize: 30
          }}
          onPress={() => navigation.navigate(SCREENS.DOJO_TRAINING)}
        />
        <Divider style={dividerStyle} />
        <Button
          icon={<FaIcon name="crown" size={30} style={styles.linkIcon}/>}
          iconRight
          buttonStyle={styles.button}
          containerStyle={styles.buttonContainer}
          type="outline"
          title="Challenges"
          titleStyle={{
            fontSize: 30
          }}
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
