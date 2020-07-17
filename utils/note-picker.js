export const pickTwoNotes = (levelData) => {
  const { range, intervals } = levelData

  const interval = intervals[Math.floor(Math.random() * intervals.length)]

  // slice the range to allow for the second note to be playabled for given interval
  let firstNoteRange;
  if (interval > 0) {
    firstNoteRange = [...range].slice(0, range.length - interval - 1);
  } else {
    firstNoteRange = [...range].slice(Math.abs(interval), range.length);
  }
  
  const firstNote = firstNoteRange[Math.floor(Math.random() * firstNoteRange.length)];

  return {
    interval,
    notes: [firstNote, firstNote + interval]
  }
}