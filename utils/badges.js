export const BADGES = {
  PASSED_THE_POINT_OF_NO_RETURN: "Passed the Point of no Return",
  EAR_NINJA: "Ear Ninja",
  MULTI_INSTRUMENTALIST: "Multi-Instrumentalist",
  CASUAL_TRAINING: "Casual Training",
  TRAINING_ENTHUSIAST: "Training Enthusiast",
  TRAINING_MASTER: "Training Master",
  PLAYMATE: "Playmate",
  INTERVAL_EXPLORER: "Interval Explorer",
  SIR_PLAYS_A_LOT: "Sir Plays A Lot",
}

export const calculateNewBadgeEarned = (profile) => {
  const {
    trainingReps,
    playReps,
    instrumentChangeCount,
    achievedLevel,
    badges,
  } = profile;

  // all badges obtained
  if (Object.keys(badges).length === Object.keys(BADGES).length) {
    return
  }

  if (achievedLevel > 5 && !badges[BADGES.PASSED_THE_POINT_OF_NO_RETURN]) {
    return BADGES.PASSED_THE_POINT_OF_NO_RETURN
  }

  if (achievedLevel === 10 && !badges[BADGES.EAR_NINJA]) {
    return BADGES.EAR_NINJA
  }

  if (instrumentChangeCount > 1 && !badges[BADGES.MULTI_INSTRUMENTALIST]) {
    return BADGES.MULTI_INSTRUMENTALIST
  }

  if (trainingReps > 50 && !badges[BADGES.CASUAL_TRAINING]) {
    return BADGES.CASUAL_TRAINING
  }

  if (trainingReps > 100 && !badges[BADGES.TRAINING_ENTHUSIAST]) {
    return BADGES.TRAINING_ENTHUSIAST
  }

  if (trainingReps > 200 && !badges[BADGES.TRAINING_MASTER]) {
    return BADGES.TRAINING_MASTER
  }

  if (playReps > 20 && !badges[BADGES.PLAYMATE]) {
    return BADGES.PLAYMATE
  }

  if (playReps > 100 && !badges[BADGES.INTERVAL_EXPLORER]) {
    return BADGES.INTERVAL_EXPLORER
  }

  if (playReps > 200 && !badges[BADGES.SIR_PLAYS_A_LOT]) {
    return BADGES.SIR_PLAYS_A_LOT
  }
}

