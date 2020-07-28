const REP_LEVEL_1 = 50;
const REP_LEVEL_2 = 100;
const REP_LEVEL_3 = 200;

export const BADGES = {
  ON_THE_WAY_UP: {
    label: "On The Way Up",
    isAchieved: false,
    toUnlock: 'Complete the white belt to unlock',
    description: 'You are going places',
    achievedLevelToUnlock: 1,
    icon: 'thumbs-up',
    iconColor: "#87ceeb",
    hasBeenDisplayedToUser: false,
  },
  PASSED_THE_POINT_OF_NO_RETURN: {
    label: "Passed the Point of no Return",
    isAchieved: false,
    description: 'You will never be a beginner again!',
    toUnlock: 'Complete half of the challenges to unlock',
    achievedLevelToUnlock: 5,
    icon: 'trophy',
    iconColor: "#D4AF37",
    hasBeenDisplayedToUser: false,
  },
  EAR_NINJA: {
    label: "Ear Ninja",
    isAchieved: false,
    description: 'You have all the belts in the world!',
    toUnlock: 'Complete all challenges to unlock',
    achievedLevelToUnlock: 10,
    icon: 'user-ninja',
    iconColor: "#000000",
    hasBeenDisplayedToUser: false,
  },
  MULTI_INSTRUMENTALIST: {
    label: "Multi Instrumentalist",
    isAchieved: false,
    description: 'When one instrument sound just doesn\'t cut it!',
    toUnlock: 'Use 5 different instruments to unlock',
    instrumentChangeCountToUnlock: 4,
    icon: 'guitar',
    iconColor: "#b74b28",
    hasBeenDisplayedToUser: false,
  },
  CASUAL_TRAINING: {
    label: "Casual Training",
    isAchieved: false,
    description: 'Practice makes perfect!',
    toUnlock: `Guess an interval ${REP_LEVEL_1} times to unlock`,
    trainingReps: REP_LEVEL_1,
    icon: 'pizza-slice',
    iconColor: "#bf8d3c",
    hasBeenDisplayedToUser: false,
  },
  TRAINING_ENTHUSIAST: {
    label: "Training Enthusiast",
    isAchieved: false,
    description: 'No Pain, no gain!',
    toUnlock: `Guess an interval ${REP_LEVEL_2} times to unlock`,
    trainingReps: REP_LEVEL_2,
    icon: 'fist-raised',
    iconColor: "#00cc00",
    hasBeenDisplayedToUser: false,
  },
  TRAINING_MASTER: {
    label: "Training Master",
    isAchieved: false,
    description: 'PERFECT practice makes perfect!',
    toUnlock: `Guess an interval ${REP_LEVEL_3} times to unlock`,
    trainingReps: REP_LEVEL_3,
    icon: 'medal',
    iconColor: "#7647a2",
    hasBeenDisplayedToUser: false,
  },
  PLAYMATE: {
    label: "Playmate",
    isAchieved: false,
    description: 'You are playing...to win!',
    toUnlock: `Play an interval ${REP_LEVEL_1} times to unlock`,
    playReps: REP_LEVEL_1,
    icon: 'play',
    iconColor: "#ff0000",
    hasBeenDisplayedToUser: false,
  },
  INTERVAL_EXPLORER: {
    label: "Interval Explorer",
    isAchieved: false,
    description: 'sail the 7 C\'s!',
    toUnlock: `Play an interval ${REP_LEVEL_2} times to unlock`,
    playReps: REP_LEVEL_2,
    icon: 'search',
    iconColor: "#cccccc",
    hasBeenDisplayedToUser: false,
  },
  SIR_PLAYS_A_LOT: {
    label: "Sir Plays A Lot",
    isAchieved: false,
    description: 'Play is the best kind of learning!',
    toUnlock: `Play an interval ${REP_LEVEL_3} times to unlock`,
    playReps: REP_LEVEL_3,
    icon: 'crown',
    iconColor: "#FFDF00",
    hasBeenDisplayedToUser: false,
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

  if (achievedLevel > BADGES.PASSED_THE_POINT_OF_NO_RETURN.achievedLevelToUnlock
    && !badges.PASSED_THE_POINT_OF_NO_RETURN.isAchieved
  ) {
      return 'PASSED_THE_POINT_OF_NO_RETURN'
  }

  if (achievedLevel >= BADGES.ON_THE_WAY_UP.achievedLevelToUnlock
    && !badges.ON_THE_WAY_UP.isAchieved
  ) {
      return 'ON_THE_WAY_UP'
  }

  if (achievedLevel >= BADGES.EAR_NINJA.achievedLevelToUnlock
    && !badges.EAR_NINJA.isAchieved
  ) {
      return 'EAR_NINJA'
  }

  if (instrumentChangeCount > BADGES.MULTI_INSTRUMENTALIST.instrumentChangeCountToUnlock
    && !badges.MULTI_INSTRUMENTALIST.isAchieved
  ) {
      return 'MULTI_INSTRUMENTALIST'
  }

  if (trainingReps > BADGES.CASUAL_TRAINING.trainingReps
    && !badges.CASUAL_TRAINING.isAchieved
  ) {
      return 'CASUAL_TRAINING'
  }

  if (trainingReps > BADGES.TRAINING_ENTHUSIAST.trainingReps
    && !badges.TRAINING_ENTHUSIAST.isAchieved
  ) {
      return 'TRAINING_ENTHUSIAST'
  }

  if (trainingReps > BADGES.TRAINING_MASTER.trainingReps
    && !badges.TRAINING_MASTER.isAchieved
  ) {
      return 'TRAINING_MASTER'
  }

  if (playReps > BADGES.PLAYMATE.playReps
    && !badges.PLAYMATE.isAchieved
  ) {
      return 'PLAYMATE'
  }

  if (playReps > BADGES.INTERVAL_EXPLORER.playReps
    && !badges.INTERVAL_EXPLORER.isAchieved
  ) {
      return 'INTERVAL_EXPLORER'
  }

  if (playReps > BADGES.SIR_PLAYS_A_LOT.playReps
    && !badges.SIR_PLAYS_A_LOT.isAchieved
  ) {
      return 'SIR_PLAYS_A_LOT'
  }
}
