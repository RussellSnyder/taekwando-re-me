import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Button } from 'react-native-elements'
import { useSelector, useDispatch } from 'react-redux';
import FaIcon from 'react-native-vector-icons/FontAwesome5';

import LEVELS from '../utils/difficulty-levels'
import { BADGES } from '../utils/badges'

import {
  selectProfile,
} from '../slices/ProfileSlice'

import { selectInstrumentName } from '../slices/AudioSlice';

export default function ProfileScreen({ navigation }) {
  const {
    achievedLevel,
    badges
  } = useSelector(selectProfile)

  const [showBadge, setShowBadge] = useState(null)

  const badgesObtained = Object.entries(badges).filter(([key, badge]) => {
    return badge.isAchieved
  })

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.beltsSection}>
          <Text h3>Belts: {achievedLevel}/{Object.keys(LEVELS).length}</Text>
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
            {achievedLevel < 1 && <Text h4>Complete Challenges to get Belts!</Text>}
          </View>
        </View>
        <View style={{ margin: 20}}/>
        <View style={styles.badgesSection}>
          <Text h3>Badges: {badgesObtained.length}/{Object.keys(BADGES).length}</Text>
          <View style={{ margin: 10}}/>
          <View style={styles.badgesContainer}>
            {Object.entries(badges).map(([key, {isAchieved, icon, iconColor, label, toUnlock}]) => {
              return (
                <View>
                  <View
                    style={[styles.row, styles.badgeRow]}
                    key={key}
                  >
                    <View
                      style={{ width: 30 }}
                    >
                      <FaIcon
                        name={icon}
                        size={25}
                        color={isAchieved ? iconColor : '#cccccc'}
                      />
                    </View>
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
                    <Button
                      type="clear"
                      icon={<FaIcon
                        size={25}
                        name="info-circle"
                      />}
                      onPress={() => setShowBadge(showBadge === key ? null : key)}
                    />
                  </View>
                  {showBadge === key && <View>
                    <View style={{ margin: 5 }} />
                    <Text style={{ marginLeft: 53 }}>
                      {toUnlock}
                    </Text>
                    <View style={{ margin: 10 }} />
                  </View>}
                  <View style={{ margin: 10 }} />
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
    // flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'space-between'
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
    alignitems: 'center'
  }
});