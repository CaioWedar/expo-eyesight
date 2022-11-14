import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

export const Container = styled(SafeAreaView)`
  flex: 1;
  justify-content: center;
  padding: 10px 20px;
`;

export const Title = styled.Text`
  color: #000;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 15px;
  text-align: center;
`;

export const Text = styled.Text`
  color: #000;
  font-size: 18px;
  text-align: center;
`;

export const Touchable = styled.TouchableNativeFeedback``;
