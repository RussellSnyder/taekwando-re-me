import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function ProfileScreen({ navigation }) {
  return (
    <View>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Dojo')}
        >
          <Text>To The Dojo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}