import React from 'react';
import RNPickerSelect from 'react-native-picker-select';

import {
  translateNumericalIntervalToNamedInterval,
} from '../../utils/intervals'

const IntervalQualityDropdown = ({ intervals, onValueChange }) => {
  const items = {};

  intervals.forEach(interval => {
    const item = translateNumericalIntervalToNamedInterval(interval);
    const key = item.substring(0, 1);
    if (!items[key]) {
      items[key] = {
        label: item.split(" ")[0],
        value: key,
      }
    }
  })

  return (
    <RNPickerSelect
      onValueChange={(value) => onValueChange(value)}
      items={Object.values(items)}
    />
  )
}

export default IntervalQualityDropdown