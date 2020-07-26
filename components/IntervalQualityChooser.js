import React from 'react'
import { View } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import { INTERVAL_QUALITIES } from '../utils/intervals'

const IntervalQualityChooser = ({ availableIntervalQualities, selectedIndex, handleChange }) => (
  <View>
    <ButtonGroup
      containerStyle={{
        marginHorizontal: 0,
        marginBottom: 45,
      }}
      buttons={availableIntervalQualities || INTERVAL_QUALITIES}
      selectedIndex={selectedIndex}
      onPress={(newValue) => {
        if (newValue === selectedIndex) return
        handleChange(newValue)
      }}
    />
  </View>
)

export default IntervalQualityChooser;