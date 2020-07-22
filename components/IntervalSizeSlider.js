import React from 'react'
import Slider from "react-native-slider";
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import FaIcon from 'react-native-vector-icons/FontAwesome5';

const IntervalSlider = ({ value, min, max, handleValueChange, handleDisplayChange }) => {
  return <View style={{ flexDirection: 'row' }}>
  <Button
    icon={<FaIcon name="minus" color="white" size={20} />}
    onPress={() => {
      if (value <= min) return
      const newValue = value - 1
      handleValueChange(newValue)
      handleDisplayChange(newValue)
    }}
  />
  <Slider
    animateTransitions={true}
    style={{
      flex: 1,
      marginHorizontal: 15,  
    }}
    step={1}
    value={value}
    minimumValue={min}
    maximumValue={max}
    onValueChange={(newValue) => {
      handleDisplayChange(newValue)
    }}
    onSlidingComplete={(newValue) => {
      handleValueChange(newValue)
    }}
  />
  <Button
    icon={<FaIcon name="plus" color="white" size={20} />}
    onPress={() => {
      if (value >= max) return
      const newValue = value + 1
      handleValueChange(newValue)
      handleDisplayChange(newValue)
    }}
  />
</View>
}

export default IntervalSlider;