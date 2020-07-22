import { range } from 'lodash'
import { translateNumericalIntervalToNamedInterval } from './intervals'

const COLORS = {
  WHITE: "#ffffff",
  ORANGE: "#ebb434",
  YELLOW: "#fcff4d",
  CAMOUFLAGE: "#50ad24",
  PURPLE: "#9025c2",
  BLUE: "#00bfff",
  BROWN: "#6e3c08",
  RED: "#eb4034",
  DARK_RED: "#570505",
  BLACK: "#000000",
}

const LEVEL_DATA = {
  1: {
    label: 'White Belt',
    backgroundColor: COLORS.WHITE,
    textColor: COLORS.BLACK,
    intervals: [3, 4, 7],
    numberOfQuestions: 10,
    rangeSize: 0.5, // 1 is widest range. Range will start from middle and go up and down. must be at least .5 is only 35 sounds files (trombone)
    sequenceRate: 1, // Probability that a sequence will be played vs. two notes simultaneously
  },
  2: {
    label: 'Orange Belt',
    backgroundColor: COLORS.ORANGE,
    textColor: COLORS.BLACK,
    intervals: [-7, -4, -3, -1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    numberOfQuestions: 10,
    rangeSize: 0.55,
    sequenceRate: 0.8,
  },
  3: {
    label: 'Yellow Belt',
    backgroundColor: COLORS.YELLOW,
    textColor: COLORS.BLACK,
    intervals: range(-15, 15),
    numberOfQuestions: 10,
    rangeSize: 0.6,
    sequenceRate: 0.7,
  },
  4: {
    label: 'Camouflage Belt',
    backgroundColor: COLORS.CAMOUFLAGE,
    textColor: COLORS.BLACK,
    intervals: range(-15, 15),
    numberOfQuestions: 10,
    rangeSize: 0.65,
    sequenceRate: 0.7,
  },
  5: {
    label: 'Purple Belt',
    backgroundColor: COLORS.PURPLE,
    textColor: COLORS.WHITE,
    intervals: range(-15, 15),
    numberOfQuestions: 10,
    rangeSize: 0.7,
    sequenceRate: 0.7,
  },
  6: {
    label: 'Blue Belt',
    backgroundColor: COLORS.BLUE,
    textColor: COLORS.WHITE,
    intervals: range(-15, 15),
    numberOfQuestions: 10,
    rangeSize: 0.75,
    sequenceRate: 0.7,
  },
  7: {
    label: 'Brown Belt',
    backgroundColor: COLORS.BROWN,
    textColor: COLORS.WHITE,
    intervals: range(-15, 15),
    numberOfQuestions: 10,
    rangeSize: 0.8,
    sequenceRate: 0.7,
  },
  8: {
    label: 'Red Belt',
    backgroundColor: COLORS.RED,
    textColor: COLORS.WHITE,
    intervals: range(-15, 15),
    numberOfQuestions: 10,
    rangeSize: 0.85,
    sequenceRate: 0.7,
  },
  9: {
    label: 'Red/Black Belt',
    backgroundColor: COLORS.DARK_RED,
    textColor: COLORS.WHITE,
    intervals: range(-15, 15),
    numberOfQuestions: 10,
    rangeSize: 0.9,
    sequenceRate: 0.7,
  },
  10: {
    label: 'Black Belt',
    backgroundColor: COLORS.BLACK,
    textColor: COLORS.WHITE,
    intervals: range(-15, 15),
    numberOfQuestions: 10,
    rangeSize: 1,
    sequenceRate: 0.7,
  },
}

export default LEVEL_DATA

export const decomposeIntervalData = (level) => {
  const dataSet = LEVEL_DATA[level].intervals.map(interval => {
    const symbol = translateNumericalIntervalToNamedInterval(Math.abs(interval))
    return {
      quality: symbol.split("")[0],
      size: (symbol.match(/\d+$/) || []).pop(),
    }
  })

  const availableIntervalQualities = Array.from(new Set([...dataSet.map(data => data.quality)]));
  const availableIntervalSizes = Array.from(new Set([...dataSet.map(data => parseInt(data.size) )]));

  return ({
    availableIntervalQualities,
    availableIntervalSizes,
    minimumIntervalSize: Math.min( ...availableIntervalSizes ),
    maximumIntervalSize: Math.max( ...availableIntervalSizes ),
  })
}
