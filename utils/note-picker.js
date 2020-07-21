import INSTRUMENTS from '../utils/instruments'

export const pickTwoNotes = (levelData, instrumentNotes = INSTRUMENTS['violin'], chosenInterval = null) => {
  const { rangeSize, intervals } = levelData
// console.log(levelData, instrumentNotes, chosenInterval)
  // Range is float from
  const notesPossible = Object.keys(instrumentNotes);
  const numberOfNotesInRange = Math.round(notesPossible.length * rangeSize);  
  const rangeStart = Math.round((notesPossible.length - numberOfNotesInRange) / 2)
  const notesPossibleInRange = notesPossible.slice(rangeSize, numberOfNotesInRange);
  
  let interval  
  if(chosenInterval === null) {
    interval = intervals[Math.floor(Math.random() * intervals.length)]
  } else {
    interval = chosenInterval
  }

  // slice the range to allow for the second note to be playabled for given interval
  let firstNoteRange;
  if (interval > 0) {
    firstNoteRange = [...notesPossibleInRange].slice(rangeStart, notesPossibleInRange.length - interval - 1);
  } else {
    firstNoteRange = [...notesPossibleInRange].slice(Math.abs(interval), notesPossibleInRange.length);
  }
  
  const firstNote = firstNoteRange[Math.floor(Math.random() * firstNoteRange.length)];

  return {
    interval,
    notes: [firstNote, parseInt(firstNote) + interval]
  }
}