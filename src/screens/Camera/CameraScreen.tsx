import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { useModel } from '../../hooks/useModel';
import { Tensor3D } from '@tensorflow/tfjs-core';
import * as SpeechService from '../../services/speech';
import * as ObjectDetectionService from '../../services/objectDetection';

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

  const runCoco = async (images: IterableIterator<Tensor3D>) => {
    try {
      const predictions = await ObjectDetectionService.detectInSnapshot(
        images,
        model
      );

      predictions.forEach((prediction) => {
        if (prediction.score > 0.8) {
          SpeechService.speak(prediction.class);
        }
      });
    } catch (err) {
      if (err instanceof Error) {
        console.error(err);
      }
    }
  };

  return (
    <>
      <StatusBar hidden />
      {isCameraActive && (
        <S.StyledCamera
          cameraTextureHeight={ObjectDetectionService.textureDims.height}
          cameraTextureWidth={ObjectDetectionService.textureDims.width}
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
