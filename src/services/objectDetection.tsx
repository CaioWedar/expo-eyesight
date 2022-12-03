import { ObjectDetection } from '@tensorflow-models/coco-ssd';
import { Tensor3D } from '@tensorflow/tfjs';
import i18n from 'i18next';

import { Platform } from 'react-native';
import * as SpeechService from '../services/speech';

export type ParsedDetection = {
  class: string;
  count: number;
};

export const detectInSnapshot = async (
  images: IterableIterator<Tensor3D>,
  model?: ObjectDetection
) => {
  if (!model) {
    throw new Error('No model');
  }
  const nextImageTensor = images.next().value;

  if (!nextImageTensor) {
    throw new Error('No image tensor');
  }

  const predictions = await model.detect(nextImageTensor);

  const parsedPredictions: ParsedDetection[] = [];

  predictions.forEach((prediction) => {
    if (prediction.score < 0.75) {
      return;
    }
    const found = parsedPredictions.find(
      ({ class: className }) => className === prediction.class
    );
    if (found) {
      found.count += 1;
    } else {
      parsedPredictions.push({ class: prediction.class, count: 1 });
    }
  });

  parsedPredictions.forEach((parsedPrediction) => {
    SpeechService.speak(
      i18n.t(`classes.${parsedPrediction.class}`, {
        count: parsedPrediction.count,
      })
    );
  });

  setTimeout(() => detectInSnapshot(images, model), 5000);
};

export const textureDims =
  Platform.OS === 'ios'
    ? {
        height: 1920,
        width: 1080,
      }
    : {
        height: 1200,
        width: 1600,
      };
