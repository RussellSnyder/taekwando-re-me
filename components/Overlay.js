import React from 'react';

import {
  View,
  TouchableWithoutFeedback,
} from 'react-native';

import { Text, Button } from 'react-native-elements'

import {
  selectOverlay,
  closeOverlay,
} from '../slices/UISlice'

import { useSelector, useDispatch } from 'react-redux';

const Overlay = () => {
  const dispatch = useDispatch();

  const { isOpen, message, closeText  } = useSelector(selectOverlay)

  return (
    <View 
      style={{
        display: isOpen ? 'flex' : 'none',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.9)'
      }}
    >
      <TouchableWithoutFeedback
        onPress={() => {
          dispatch(closeOverlay())
        }}
      >
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
          padding: 50,
        }}>
          <Text
            h4
            style={{
              textAlign: 'center',
              color: 'white'
            }}
          >{message}</Text>
          <View style={{ margin: 10 }}/>
          <Button
            title={closeText || "Close"}
            onPress={() => {
              dispatch(closeOverlay())
            }}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}

export default Overlay