import React from 'react'
import Slider from "react-native-slider";
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import FaIcon from 'react-native-vector-icons/FontAwesome5';

const IntervalSlider = ({ value, min, max, handleChange }) => {
  return <View style={{ flexDirection: 'row' }}>
  <Button
    icon={<FaIcon name="minus" color="white" size={20} />}
    onPress={() => {
      if (value <= min) return
      handleChange(value - 1)
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
    onSlidingComplete={(newValue) => {
      handleChange(newValue)
    }}
  />
  <Button
    icon={<FaIcon name="plus" color="white" size={20} />}
    onPress={() => {
      if (value >= max) return
      handleChange(value + 1)
    }}
  />
</View>
}

export default IntervalSlider;