import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

export const Container = styled(SafeAreaView)`
  flex: 1;
  justify-content: flex-end;
  padding: 10px 20px;
`;

export const TextContainer = styled.View`
  flex: 1;
`;

export const Title = styled.Text`
  color: #000;
  font-size: 24px;
`;

export const Text = styled.Text`
  color: #000;
  font-size: 18px;
`;

export const ButtonText = styled.Text`
  font-size: 18px;
  color: #fff;
`;

export const Touchable = styled.TouchableNativeFeedback``;

export const Button = styled.View`
  background-color: #02735e;
  margin: 20px 0;
  padding: 15px;
  align-items: center;
`;
