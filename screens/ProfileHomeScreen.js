import React from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import { ButtonGroup, Text, Button } from 'react-native-elements'
import { useSelector, useDispatch } from 'react-redux';
import FaIcon from 'react-native-vector-icons/FontAwesome5';

import SCREENS from './screens';
import LEVELS from '../utils/difficulty-levels'
import { BADGES } from '../utils/badges'

import {
  selectProfile,
} from '../slices/ProfileSlice'

import {
  createTraining,
} from '../slices/DojoSlice'

import { selectInstrumentName } from '../slices/AudioSlice';

export default function ProfileScreen({ navigation }) {
  const dispatch = useDispatch();

  const {
    achievedLevel,
    badges
  } = useSelector(selectProfile)

  const { instrument } = useSelector(selectInstrumentName)

  const badgesObtained = Object.entries(badges).filter(([key, isAchieved]) => {
    return isAchieved
  })

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.beltsSection}>
          <Text h4>Belts: {achievedLevel}/{Object.keys(LEVELS).length}</Text>
          <View style={{ margin: 10}}/>
          <View style={styles.beltsContainer}>
            {Object.entries(LEVELS).slice(0, achievedLevel).map(([key, {label, backgroundColor, textColor }]) => {
              return (
                <View
                  style={styles.row}
                  key={key}
                >
                  <Text
                    style={{
                      flex: 1,
                      fontWeight: 'bold',
                      color: textColor,
                      textAlign: 'center',
                      backgroundColor: backgroundColor,
                      padding: 10,
                      marginBottom: 10
                    }}
                  >
                    {label}
                  </Text>
                </View>
              )
            })}
            {achievedLevel < Object.keys(LEVELS).length && <Button
              type="outline"
              title={`Train For ${LEVELS[achievedLevel + 1].label}`}
              onPress={() => {
                dispatch(createTraining({
                  level: achievedLevel + 1,
                  instrument,
                }))
                navigation.navigate(SCREENS.DOJO_HOME, {
                  screen: SCREENS.DOJO_TRAININGS,
                })
              }}
            />}
          </View>
        </View>
        <View style={{ margin: 20}}/>
        <View style={styles.badgesSection}>
          <Text h4>Badges: {badgesObtained.length}/{Object.keys(BADGES).length}</Text>
          <View style={{ margin: 10}}/>
          <View style={styles.badgesContainer}>
            {Object.entries(badges).map(([key, {isAchieved, icon, iconColor, label}]) => {
              console.log(iconColor)
              return (
                <View
                  style={[styles.row, styles.badgeRow]}
                  key={key}
                >
                  <FaIcon
                    name={icon}
                    size={25}
                    color={isAchieved ? iconColor : '#cccccc'}
                    width={90}
                  />
                  <Text
                    h4
                    style={{
                      flex: 1,
                      marginLeft: 20,
                      marginBottom: 10,
                      color: isAchieved ? "black" : '#999999'
                    }}
                  >
                    {label}
                  </Text>
                </View>
              )
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'space-between'

  },
  beltsSection: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    // justifyContent: 'space-between'
  },
  row: {
    flexDirection: 'row',
      // flex: 1,
    alignItems: 'stretch',
  },
  badgesSection: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  badgeRow: {
    marginBottom: 20
  }
});