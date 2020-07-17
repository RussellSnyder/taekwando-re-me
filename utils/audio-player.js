import { Audio } from 'expo-av'

export const playTwoNotesTogether = async ([firstNote, secondNote], instrumentSounds) => {
	const firstNoteSoundObject = new Audio.Sound()
	const secondNoteSoundObject = new Audio.Sound()

  try {
    await firstNoteSoundObject.loadAsync(instrumentSounds[firstNote]);
    await secondNoteSoundObject.loadAsync(instrumentSounds[secondNote]);

    await firstNoteSoundObject.playAsync();
    await secondNoteSoundObject.playAsync();

	} catch (error) {
		console.log(error)
	}  
}

export const playTwoNotesSequencially = async ([firstNote, secondNote], instrumentSounds) => {
	const firstNoteSoundObject = new Audio.Sound()
  const secondNoteSoundObject = new Audio.Sound()
 
  firstNoteSoundObject.setOnPlaybackStatusUpdate(async (update) => {
    if (update.didJustFinish) {
      try {
        await secondNoteSoundObject.loadAsync(instrumentSounds[secondNote]);    
        await secondNoteSoundObject.playAsync();
    
      } catch (error) {
        console.log(error)
      }      
    }
  });

  try {
    await firstNoteSoundObject.loadAsync(instrumentSounds[firstNote]);
    await firstNoteSoundObject.playAsync();

	} catch (error) {
		console.log(error)
	}  
}
