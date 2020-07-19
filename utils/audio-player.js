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
    reject(error)
  }
  
  return new Promise((resolve, reject) => {
    firstNoteSoundObject.setOnPlaybackStatusUpdate(async (update) => {
      if (update.didJustFinish) {
        return resolve('complete')
      }
    });
  })

}

export const playTwoNotesSequencially =  async ([firstNote, secondNote], instrumentSounds) => {
	const firstNoteSoundObject = new Audio.Sound()
  const secondNoteSoundObject = new Audio.Sound()
 
  try {
    await firstNoteSoundObject.loadAsync(instrumentSounds[firstNote]);
    await firstNoteSoundObject.playAsync();

  } catch (error) {
    reject(error)
  }  

  return new Promise((resolve, reject) => {
    firstNoteSoundObject.setOnPlaybackStatusUpdate(async (update) => {
      if (update.didJustFinish) {
        try {
          await secondNoteSoundObject.loadAsync(instrumentSounds[secondNote]);    
          await secondNoteSoundObject.playAsync();

          secondNoteSoundObject.setOnPlaybackStatusUpdate((playbackStatus) => {
            if (playbackStatus.didJustFinish) {
              return resolve('complete')
            }
          })
        } catch (error) {
          reject(error)
        }      
      }
    });

  })
}
