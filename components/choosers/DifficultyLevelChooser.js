import React from 'react';
import RNPickerSelect from 'react-native-picker-select';
import levels from '../../utils/difficulty-levels'

const DifficultyLevelChooser = ({ onValueChange }) => {
  const items = Object.entries(levels).map(([level, data]) => ({
    label: data.label,
    value: level,
  }));

  return (
    <RNPickerSelect
      placeholder={{
        label: "Select a Level",
        value: null
      }}
      onValueChange={(value) => onValueChange(value)}
      items={items}
      value={items[0].value}
    />
  )
}

export default DifficultyLevelChooser