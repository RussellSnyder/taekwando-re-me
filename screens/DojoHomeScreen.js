import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import InstrumentChooser from '../components/choosers/InstrumentChooser'
import DifficultyLevelChooser from '../components/choosers/DifficultyLevelChooser'

export default function DojoHomeScreen({ navigation }) {
  const [currentLevel, setCurrentLevel] = useState(1)
  const [currentInstrument, setCurrentInstrument] = useState('violin')

  const handleQuizStart = () => {
    // TODO handle not setting level or instrument
    navigation.navigate('Interval Training', {
      level: currentLevel,
      instrument: currentInstrument,
    })
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Dojo</Text>
        <View style={styles.selectors}>
          <DifficultyLevelChooser
            onValueChange={(newLevel) => setCurrentLevel(newLevel)}
          />
          <InstrumentChooser
            onValueChange={(newInstrument) => setCurrentInstrument(newInstrument)}
          />
        </View>
      <View>
        <TouchableOpacity
          onPress={() => handleQuizStart()}
        >
          <Text>Take a Quiz</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  selectors: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
  }
});
