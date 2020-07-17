import React from 'react';
import RNPickerSelect from 'react-native-picker-select';

import {
  translateNumericalIntervalToNamedInterval,
} from '../../utils/intervals'

const IntervalSizeDropdown = ({ intervals, onValueChange }) => {
  const items = {};

  intervals.forEach(interval => {
    const item = translateNumericalIntervalToNamedInterval(interval);
    const key = item.split(" ")[1];
    if (!items[key]) {
      items[key] = {
        label: key,
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

export default IntervalSizeDropdown