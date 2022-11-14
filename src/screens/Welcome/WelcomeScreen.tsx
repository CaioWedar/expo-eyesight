import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Camera, PermissionResponse, PermissionStatus } from 'expo-camera';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { RootStackNavigatorParams } from '../../../App';

import * as S from './WelcomeScreen.styles';
import * as SpeechService from '../../services/speech';
import { Linking } from 'react-native';

type WelcomeScreenProp = StackNavigationProp<
  RootStackNavigatorParams,
  'Welcome'
>;

const WelcomeScreen = () => {
  const [status, requestPermission] = Camera.useCameraPermissions();
  const { t } = useTranslation();
  const navigation = useNavigation<WelcomeScreenProp>();

  const handleContinue = async (
    newStatus: PermissionResponse | null = status
  ) => {
    if (newStatus?.granted) {
      navigation.navigate('Camera');
    } else {
      const requested = await requestPermission();
      if (!requested.canAskAgain) {
        Linking.openSettings();

        return;
      }
      if (requested.status === PermissionStatus.DENIED) {
        return;
      }
      handleContinue(requested);
    }
  };

  const handleIntro = () => {
    SpeechService.speak(t('welcome.intro'));
  };

  const texts = useMemo(
    () => (
      <S.Container accessible>
        <S.Title>{SpeechService.speak(t('welcome.title'))}</S.Title>
        <S.Text>{SpeechService.speak(t('welcome.text.one'))}</S.Text>
        <S.Text>{SpeechService.speak(t('welcome.text.two'))}</S.Text>
      </S.Container>
    ),
    []
  );

  return (
    <S.Touchable onPress={() => handleContinue()} onLongPress={handleIntro}>
      {texts}
    </S.Touchable>
  );
};

export default WelcomeScreen;
