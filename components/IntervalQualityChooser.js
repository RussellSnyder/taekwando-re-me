import React from 'react'
import { View } from 'react-native';
import { ButtonGroup } from 'react-native-elements';

const orderOfQulities = ["m", "M", "D", "P", "A"]

const IntervalQualityChooser = ({ availableIntervalQualities, selectedIndex, handleChange }) => (
  <View>
    <ButtonGroup
      containerStyle={{
        marginHorizontal: 0,
        marginBottom: 45,
      }}
      buttons={orderOfQulities.filter(quality => availableIntervalQualities.indexOf(quality) !== -1)}
      selectedIndex={selectedIndex}
      onPress={(newValue) => {
        if (newValue === selectedIndex) return
        handleChange(newValue)
      }}
    />
  </View>
)

export default IntervalQualityChooser;