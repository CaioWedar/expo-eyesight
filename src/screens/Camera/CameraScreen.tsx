import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Linking, Platform, StatusBar, StyleSheet } from "react-native";
import { Camera, CameraType, PermissionStatus } from "expo-camera";
import { cameraWithTensors } from "@tensorflow/tfjs-react-native";
import { useModel } from "../../hooks/useModel";
import { Tensor3D } from "@tensorflow/tfjs-core";
import * as Speech from "expo-speech";

const TensorCamera = cameraWithTensors(Camera);

const CameraScreen = () => {
  const navigation = useNavigation();

  const model = useModel();

  const [isCameraActive, setIsCameraActive] = useState(false);

  useEffect(() => {
    const authorizeCamera = async () => {
      const { status } = await Camera.getCameraPermissionsAsync();
      if (status === PermissionStatus.DENIED) {
        const { status: newStatus } =
          await Camera.requestCameraPermissionsAsync();
        if (newStatus !== PermissionStatus.GRANTED) {
          Linking.openSettings();
          navigation.goBack();
        } else {
          setIsCameraActive(true);
        }
      } else if (status === PermissionStatus.GRANTED) {
        setIsCameraActive(true);
      }
    };
    authorizeCamera().catch((err) => {
      console.error(err);
    });
  }, []);

  const runCoco = (images: IterableIterator<Tensor3D>) => {
    const detectInSnapshot = async () => {
      if (!model) {
        throw new Error("No model");
      }
      const nextImageTensor = images.next().value;

      if (!nextImageTensor) {
        throw new Error("No image tensor");
      }

      console.error("detecting objects");
      model.detect(nextImageTensor).then((predictions) => {
        if (predictions[0].score > 0.8) {
          Speech.speak(predictions[0].class);
          console.error(predictions[0].class);
          console.error(predictions[0].score);
        }
      });

      requestAnimationFrame(detectInSnapshot);
    };
    detectInSnapshot();
  };

  let textureDims;
  if (Platform.OS === "ios") {
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
        <TensorCamera
          style={StyleSheet.absoluteFill}
          type={CameraType.back}
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
