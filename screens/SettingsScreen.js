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
      console.log(value)
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

export default function ProfileScreen() {
  const dispatch = useDispatch()
  const currentInstrument = useSelector(selectInstrumentName)

  return (
    <View style={styles.container}>
      <View style={styles.settings}>
        <View style={styles.item}>
          <Text h4>Instrument</Text>
          <InstrumentPicker
            instrument={currentInstrument}
            handleInstrumentChange={(instrument) => {
              dispatch(updateInstrument({
                instrument: instrument
              }));
            }}
          />
        </View>
        <View style={styles.item}>
          <Text h4>About</Text>
          <Text>
            This App was made with React Native by Russell Snyder
            {"\n"}
            Need a developer for a music app? Hit me up :-)
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
    marginBottom: 20,
  }
});