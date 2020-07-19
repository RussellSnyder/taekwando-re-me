import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { ButtonGroup } from 'react-native-elements'

import LEVELS from '../utils/difficulty-levels'

import {
  updateDojo,
  selectDojo,
} from '../slices/DojoSlice'


export default function QuizConfigurator() {
  const dispatch = useDispatch();
  const dojo = useSelector(selectDojo);  

  const { level, instrument } = dojo

  const levelButtons = Object.entries(LEVELS).map(([key, {label}]) => {
    const component = () => <Text>{label}</Text>
    return { element: component }
  })

  return (
    <View style={styles.selectors}>
      <View style={styles.selector}>
        <Text>Level</Text>
        <ButtonGroup
          onPress={(newLevel) => dispatch(updateDojo({ level: newLevel }))}
          selectedIndex={level}
          buttons={levelButtons}
          vertical={true}
          containerStyle={{height: 500}}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  selectors: {
    flex: 1,
    textAlign: 'center',
    flexDirection: 'row',
    alignContent: 'space-around',
    // justifyContent: 'center',
  }
});
