import INSTRUMENTS from '../utils/instruments'

export const pickTwoNotes = (levelData, instrumentNotes = INSTRUMENTS['violin'], chosenInterval = null) => {
  const { rangeSize, intervals } = levelData
  // console.log(levelData, instrumentNotes, chosenInterval)
  // Range is float from
  const notesPossible = Object.keys(instrumentNotes).map(note => parseInt(note));
  const numberOfNotesInRange = Math.round(notesPossible.length * rangeSize);  
  const rangeStartIndex = Math.round((notesPossible.length - numberOfNotesInRange) / 2)
  const notesPossibleInRange = notesPossible.slice(rangeStartIndex, rangeStartIndex + numberOfNotesInRange);
  
  let interval  
  if(chosenInterval === null) {
    interval = intervals[Math.floor(Math.random() * intervals.length)]
  } else {
    interval = chosenInterval
  }

  // console.log({notesPossible}, {numberOfNotesInRange}, {rangeStartIndex}, {notesPossibleInRange})

  // slice the range to allow for the second note to be playabled for given interval
  let firstNoteRange;
  if (interval > 0) {
    firstNoteRange = [...notesPossibleInRange].slice(rangeStartIndex, notesPossibleInRange.length - interval - 1);
  } else {
    firstNoteRange = [...notesPossibleInRange].slice(Math.abs(interval), notesPossibleInRange.length);
  }
  if (firstNoteRange.length < 0) {
    console.error('there are no notes available for that rangeSize. Please increase')
  }  

  const firstNote = firstNoteRange[Math.floor(Math.random() * firstNoteRange.length)];

  return {
    interval,
    notes: [firstNote, parseInt(firstNote) + interval]
  }
}