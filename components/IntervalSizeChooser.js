import React from 'react'
import { View } from 'react-native';
import { ButtonGroup } from 'react-native-elements';

const IntervalSizeChooser = ({ availableIntervalSizes, selectedIndex, handleChange }) => (
  <View>
    <ButtonGroup
      containerStyle={{
        marginHorizontal: 0,
        marginBottom: 30,
      }}
      buttons={availableIntervalSizes}
      selectedIndex={selectedIndex}
      onPress={(newValue) => {
        if (newValue === selectedIndex) return
        handleChange(newValue)
      }}
    />
  </View>
)

export default IntervalSizeChooser;