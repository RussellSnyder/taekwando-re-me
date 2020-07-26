import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';
import startCase from 'lodash/startCase'

import {
  updateInstrument,
  selectInstrumentName,
} from '../slices/AudioSlice'

import {
  incrementInstrumentChangeCount,
} from '../slices/ProfileSlice'

import INSTRUMENTS from '../utils/instruments'

const InstrumentPicker = ({ instrument, handleInstrumentChange }) => {
  return <RNPickerSelect
    style={{
      inputIOS: {
        fontSize: 16,
        marginTop: 5,
        paddingTop: 13,
        paddingHorizontal: 10,
        paddingBottom: 12,
        borderWidth: 1,
        fontSize: 25,
        borderColor: 'gray',
        borderRadius: 4,
        backgroundColor: 'white',
      },
      paddingVertical: 100,
    }}
    value={instrument}
    onValueChange={(value) => {
      handleInstrumentChange(value);
    }}
    placeholder={{}}
    items={Object.entries(INSTRUMENTS).map(([label]) => ({
        label: startCase(label),
        value: label
    }))}
    doneText="Choose Instrument"
  />
}

export default function SettingScreen() {
  const dispatch = useDispatch()
  const currentInstrument = useSelector(selectInstrumentName)
  
  return (
    <View style={styles.container}>
      <View style={styles.settings}>
        <View style={styles.item}>
          <Text h4>Instrument</Text>
          <View style={{ margin: 4 }} />
          <InstrumentPicker
            instrument={currentInstrument}
            handleInstrumentChange={(instrument) => {
              dispatch(updateInstrument({
                instrument: instrument
              }));
              dispatch(incrementInstrumentChangeCount());
            }}
          />
        </View>
        <View style={styles.item}>
          <Text h4>Languages</Text>
          <View style={{ margin: 4 }} />
          <Text>COMING SOON!</Text>
        </View>
        <View style={styles.item}>
          <Text h4>About</Text>
          <View style={{ margin: 4 }} />
          <Text>
            This App was made with React Native by Russell Snyder
            {"\n"}
            Need some help on a music app?
            {"\n"}
            Shoot me an email: russellevansnyder@gmail.com 
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'column',
    alignItems: 'stretch',

  },
  settings: {
    flex: 10,
    flexDirection: 'column',
    alignItems: 'stretch',
    // justifyContent: 'space-evenly'
  },
  item: {
    marginBottom: 25,
  }
});