import { ObjectDetection } from '@tensorflow-models/coco-ssd';
import { Tensor3D } from '@tensorflow/tfjs';
import { Platform } from 'react-native';

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

  setTimeout(() => detectInSnapshot(images, model), 5000);

  return predictions;
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
