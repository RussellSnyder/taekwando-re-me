import React, { useEffect, useState } from 'react';
import FaIcon from 'react-native-vector-icons/FontAwesome5';


import {
  View,
  TouchableWithoutFeedback,
} from 'react-native';

import { Text, Button } from 'react-native-elements'

import {
  selectBadges,
  updateBadge,
} from '../slices/ProfileSlice'

import { useSelector, useDispatch } from 'react-redux';

const BadgeOverlay = () => {
  const dispatch = useDispatch();
  const badges = useSelector(selectBadges)

  const [isOpen, setIsOpen] = useState(false)

  const badgesToDisplay = Object.entries(badges).find(([key, badge]) => {
    // console.log(key, badge, badge.isAchieved, badges.hasBeenDisplayedToUser)
    return badge.isAchieved && !badge.hasBeenDisplayedToUser
  });

  const shouldDisplayBadge = badgesToDisplay && badgesToDisplay.length > 1;
  
  useEffect(() => {
    if (shouldDisplayBadge) {
      setTimeout(() => {
        setIsOpen(true)
      }, 500)
    }
  });

  if (!shouldDisplayBadge) return null

  const { label, description, icon, iconColor } = badgesToDisplay[1]

  return (
    <View 
      style={{
        display: shouldDisplayBadge ? 'flex' : 'none',
        position: 'absolute',
        zIndex: 2,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.9)'
      }}
    >
      <TouchableWithoutFeedback
        onPress={() => {
          setIsOpen(false)
          const [key] = badgesToDisplay;
          dispatch(updateBadge({
            key,
            hasBeenDisplayedToUser: true,
          }))    
        }}
      >
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
          padding: 50,
        }}>
          <Text
            h3
            style={{
              textAlign: 'center',
              color: 'white',
            }}
          >You earned a badge!</Text>
          <View style={{ margin: 15 }}/>
          <Text
            h2
            style={{
              textAlign: 'center',
              color: 'white'
            }}
          >{label}</Text>
          <View style={{ margin: 10 }}/>
          <FaIcon
            name={icon}
            color={iconColor}
            size={50}
            style={{
              textAlign: 'center'
            }}
          />
          <View style={{ margin: 10 }}/>
          <Text
            h3
            style={{
              textAlign: 'center',
              color: 'white'
            }}
          >{description}</Text>
          <View style={{ margin: 20 }}/>
          <Button
            title={"Nnnnnnice!"}
            onPress={() => {
              const [key] = badgesToDisplay;
              dispatch(updateBadge({
                key,
                hasBeenDisplayedToUser: true,
              }))    
              setIsOpen(false)
            }}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}

export default BadgeOverlay