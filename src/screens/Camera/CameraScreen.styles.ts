import styled from 'styled-components/native';
import { Camera, CameraType } from 'expo-camera';
import { cameraWithTensors } from '@tensorflow/tfjs-react-native';
import { Dimensions } from 'react-native';

const TensorCamera = cameraWithTensors(Camera);

export const StyledCamera = styled(TensorCamera).attrs({
  type: CameraType.back,
})`
  width: ${Dimensions.get('window').width}px;
  height: ${Dimensions.get('window').height - 250}px;
`;
