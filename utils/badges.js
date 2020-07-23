export const BADGES = {
  PASSED_THE_POINT_OF_NO_RETURN: {
    label: "Passed the Point of no Return",
    isAchieved: true,
    description: 'this badge is about blah',
    icon: 'trophy',
    iconColor: "#D4AF37",
  },
  EAR_NINJA: {
    label: "Ear Ninja",
    isAchieved: true,
    description: 'this badge is about blah',
    icon: 'user-ninja',
    iconColor: "#000000"
  },
  MULTI_INSTRUMENTALIST: {
    label: "Multi-Instrumentalist",
    isAchieved: true,
    description: 'this badge is about blah',
    icon: 'guitar',
    iconColor: "#b74b28",
  },
  CASUAL_TRAINING: {
    label: "Casual Training",
    isAchieved: true,
    description: 'this badge is about blah',
    icon: 'pizza-slice',
    iconColor: "#bf8d3c",
  },
  TRAINING_ENTHUSIAST: {
    label: "Training Enthusiast",
    isAchieved: true,
    description: 'this badge is about blah',
    icon: 'fist-raised',
    iconColor: "#00cc00",
  },
  TRAINING_MASTER: {
    label: "Training Master",
    isAchieved: true,
    description: 'this badge is about blah',
    icon: 'medal',
    iconColor: "#7647a2",
  },
  PLAYMATE: {
    label: "Playmate",
    isAchieved: true,
    description: 'this badge is about blah',
    icon: 'play',
    iconColor: "#ff0000",
  },
  INTERVAL_EXPLORER: {
    label: "Interval Explorer",
    isAchieved: true,
    description: 'this badge is about blah',
    icon: 'search',
    iconColor: "#000000",
  },
  SIR_PLAYS_A_LOT: {
    label: "Sir Plays A Lot",
    isAchieved: true,
    description: 'this badge is about blah',
    icon: 'crown',
    iconColor: "#FFDF00",
  },
}

export const calculateNewBadgeEarned = (profile) => {
  const {
    trainingReps,
    playReps,
    instrumentChangeCount,
    achievedLevel,
    badges,
  } = profile;

  const badgesAcheived = Object.entries(badges).filter(([key, {isAchieved}]) => {
    return isAchieved
  })
  // all badges obtained
  if (badgesAcheived.length === badges.length) {
    return
  }

  if (achievedLevel > 5
    && !badges[BADGES.PASSED_THE_POINT_OF_NO_RETURN.isAchieved]
  ) {
    return BADGES.PASSED_THE_POINT_OF_NO_RETURN
  }

  if (achievedLevel === 10
    && !badges[BADGES.EAR_NINJA.isAchieved]
  ) {
    return BADGES.EAR_NINJA
  }

  if (instrumentChangeCount > 1
    && !badges[BADGES.MULTI_INSTRUMENTALIST.isAchieved]
  ) {
    return BADGES.MULTI_INSTRUMENTALIST
  }

  if (trainingReps > 50
    && !badges[BADGES.CASUAL_TRAINING.isAchieved]
  ) {
    return BADGES.CASUAL_TRAINING
  }

  if (trainingReps > 100
    && !badges[BADGES.TRAINING_ENTHUSIAST.isAchieved]
  ) {
    return BADGES.TRAINING_ENTHUSIAST
  }

  if (trainingReps > 200
    && !badges[BADGES.TRAINING_MASTER.isAchieved]
  ) {
    return BADGES.TRAINING_MASTER
  }

  if (playReps > 20
    && !badges[BADGES.PLAYMATE.isAchieved]
  ) {
    return BADGES.PLAYMATE
  }

  if (playReps > 100
    && !badges[BADGES.INTERVAL_EXPLORER.isAchieved]
  ) {
    return BADGES.INTERVAL_EXPLORER
  }

  if (playReps > 200
    && !badges[BADGES.SIR_PLAYS_A_LOT.isAchieved]
  ) {
    return BADGES.SIR_PLAYS_A_LOT
  }
}

