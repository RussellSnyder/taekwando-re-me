const INTERVAL_MAP = {
  0: {
    names: ['Perfect 1'],
    symbols: ['P0']
  },
  1: {
    names: ['minor 2'],
    symbols: ['m2']
  },
  2: {
    names: ['Major 2'],
    symbols: ['M2']
  },
  3: {
    names: ['minor 3'],
    symbols: ['m3']
  },
  4: {
    names: ['Major 3'],
    symbols: ['M3']
  },
  5: {
    names: ['Perfect 4'],
    symbols: ['P4']
  },
  6: {
    names: ['Augemented 4', 'Diminished 5'],
    symbols: ['A4', 'D5']
  },
  7: {
    names: ['Perfect 5'],
    symbols: ['P5']
  },
  8: {
    names: ['minor 6', 'Augmeneted 5'],
    symbols: ['m6', 'A5']
  },
  9: {
    names: ['Major 6'],
    symbols: ['M6']
  },
  10: {
    names: ['minor 7'],
    symbols: ['m7']
  },
  11: {
    names: ['Major 7'],
    symbols: ['M7']
  },
  12: {
    names: ['Perfect 8'],
    symbols: ['P12']
  },
  13: {
    names: ['minor 9', 'minor 2'],
    symbols: ['m9', 'm2']
  },
  14: {
    names: ['Major 9', 'Major 2'],
    symbols: ['M9', 'M2']
  },
  15: {
    names: ['minor 10', 'minor 3'],
    symbols: ['m10', 'm3']
  },
  16: {
    names: ['Major 10', 'Major 3'],
    symbols: ['M10', 'M3']
  },
  17: {
    names: ['Perfect 11', 'Perfect 4'],
    symbols: ['P11', 'P4']
  },
  18: {
    names: ['Augemented 11', 'Augemented 4', 'Diminished 12', 'Diminished 5'],
    symbols: ['A11', 'D12', 'A4', 'D5']
  },
  19: {
    names: ['Perfect 12', 'Perfect 5'],
    symbols: ['P12', 'P5']
  },
  20: {
    names: ['minor 13', 'Augmeneted 12', 'minor 6', 'Augmeneted 5'],
    symbols: ['m13', 'A12', 'm6', 'A5']
  },
  21: {
    names: ['Major 13', 'Major 6'],
    symbols: ['M13', 'M6']
  },
  22: {
    names: ['minor 14', 'minor 7'],
    symbols: ['m14', 'm7']
  },
  23: {
    names: ['Major 14', 'Major 7'],
    symbols: ['M14', 'M7']
  },
  24: {
    names: ['Perfect 16', 'Perfect 8'],
    symbols: ['P15', 'P8']
  },
}

export const translateNumericalIntervalToNamedInterval = (numericalInterval) => {
  if (!INTERVAL_MAP[numericalInterval]) {
    console.error(`${numericalInterval} is not defined`)
  }
  return INTERVAL_MAP[numericalInterval].names[0]
}

export const getQualityOfNumericInterval = (numericalInterval) => {
  if (!INTERVAL_MAP[numericalInterval]) {
    console.error(`${numericalInterval} is not defined`)
  }
  return INTERVAL_MAP[numericalInterval].symbols[0].split("")[0]
}

export const getDataForNumericalInterval = (numericalInterval) => {
  if (!INTERVAL_MAP[numericalInterval]) {
    console.error(`${JSON.stringify(numericalInterval)} is not defined`)
  }
  return INTERVAL_MAP[numericalInterval]
}

export const translateSymbolsIntoNumbericalInterval = (symbol) => {
  const intervalData = Object.entries(INTERVAL_MAP).filter(([key, { symbols }]) => {
    // todo handle cases with multiple symbols
    return symbols[0] === symbol
  })
  if (intervalData.length < 1) {
    // console.error(`${symbol} is not in Interval Map`)
    return symbol
  }
  return Object.keys(intervalData)[0]
} 