import * as Speech from 'expo-speech';

export const speak = (text: string) => {
  Speech.speak(text, {
    language: 'pt',
  });

  return text;
};

export const stop = Speech.stop;
