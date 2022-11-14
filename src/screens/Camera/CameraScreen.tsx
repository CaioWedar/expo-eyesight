import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react';
import { Platform, StatusBar } from 'react-native';
import { useModel } from '../../hooks/useModel';
import { Tensor3D } from '@tensorflow/tfjs-core';
import * as Speech from 'expo-speech';

import * as S from './CameraScreen.styles';

const CameraScreen = () => {
  const model = useModel();

  const [isCameraActive, setIsCameraActive] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setIsCameraActive(true);

      return () => {
        setIsCameraActive(false);
      };
    }, [])
  );

  const runCoco = (images: IterableIterator<Tensor3D>) => {
    const detectInSnapshot = async () => {
      if (!model) {
        throw new Error('No model');
      }
      const nextImageTensor = images.next().value;

      if (!nextImageTensor) {
        throw new Error('No image tensor');
      }

      const predictions = await model.detect(nextImageTensor);

      predictions.forEach((prediction) => {
        if (prediction.score > 0.8) {
          Speech.speak(prediction.class);
        }
      });

      setTimeout(detectInSnapshot, 5000);
    };
    try {
      detectInSnapshot();
    } catch (err) {
      if (err instanceof Error) {
        console.error(err);
      }
    }
  };

  let textureDims;
  if (Platform.OS === 'ios') {
    textureDims = {
      height: 1920,
      width: 1080,
    };
  } else {
    textureDims = {
      height: 1200,
      width: 1600,
    };
  }

  return (
    <>
      <StatusBar hidden />
      {isCameraActive && (
        <S.StyledCamera
          cameraTextureHeight={textureDims.height}
          cameraTextureWidth={textureDims.width}
          resizeDepth={3}
          resizeWidth={152}
          resizeHeight={200}
          onReady={runCoco}
          autorender={true}
          useCustomShadersToResize={false}
        />
      )}
    </>
  );
};

export default CameraScreen;
