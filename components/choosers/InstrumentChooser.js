import React from 'react';
import RNPickerSelect from 'react-native-picker-select';
import instruments from '../../utils/intruments'

const InstrumentChooser = ({ onValueChange }) => {
  const items = Object.keys(instruments).map(instrument => ({
    label: instrument,
    value: instrument,
  }));
  
  return (
    <RNPickerSelect
      placeholder={{
        label: "Select an Instrument",
        value: null
      }}

      onValueChange={(value) => onValueChange(value)}
      items={items}
      value={items[0].value}
    />
  )
}

export default InstrumentChooser