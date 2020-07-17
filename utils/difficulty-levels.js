import { range } from 'lodash'

export default {
  1: {
    label: 'White Belt',
    intervals: [3, 4, 7, 11],
    range: range(60, 75),
    sequenceRate: 1, // Probability that a sequence will be played vs. two notes simultaneously
  },
  2: {
    label: 'Orange Belt',
    intervals: [-7, -4, -3, -1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    range: range(55, 75),
    sequenceRate: 0.8,
  },
  3: {
    label: 'Yellow Belt',
    intervals: range(-15, 15),
    range: range(55, 93),
    sequenceRate: 0.7,
  },
  4: {
    label: 'Camouflage Belt',
    intervals: range(-15, 15),
    range: range(55, 93),
    sequenceRate: 0.7,
  },
  5: {
    label: 'Purple Belt',
    intervals: range(-15, 15),
    range: range(55, 93),
    sequenceRate: 0.7,
  },
  6: {
    label: 'Blue Belt',
    intervals: range(-15, 15),
    range: range(55, 93),
    sequenceRate: 0.7,
  },
  7: {
    label: 'Brown Belt',
    intervals: range(-15, 15),
    range: range(55, 93),
    sequenceRate: 0.7,
  },
  8: {
    label: 'Red Belt',
    intervals: range(-15, 15),
    range: range(55, 93),
    sequenceRate: 0.7,
  },
  9: {
    label: 'Red/Black Belt',
    intervals: range(-15, 15),
    range: range(55, 93),
    sequenceRate: 0.7,
  },
  10: {
    label: 'Black Belt',
    intervals: range(-15, 15),
    range: range(55, 93),
    sequenceRate: 0.7,
  },
}
