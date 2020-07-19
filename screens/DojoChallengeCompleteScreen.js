import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function DojoChallengeCompleteScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>You Did it!</Text>
      <Text>Or maybe not, coming soon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
  }
});
