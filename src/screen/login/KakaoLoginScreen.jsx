import { KAKAO_REST_API_KEY } from '@env';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import WebView from 'react-native-webview';
import { shallow } from 'zustand/shallow';
import { useGlobalState } from '../../store/useGlobalState';
import { useDeviceBack } from '../../hooks/useDeviceBack';
import { insertBeforeLast, setStorage } from '../../common/common';
import Header from '../../common/ui/Header';
import theme from '../../style/theme';

const REDIRECT_URI = 'http://127.0.0.1:3000/oauth/kakao/callback';
function KakaoLoginScreen() {
  const navigation = useNavigation();
  const [setIsLogined] = useGlobalState(state => [state.setIsLogined], shallow);

  const { webviewRef, onPressHardwareBackButton } = useDeviceBack();
  return (
    <View style={theme.container}>
      <Header title='카카오 로그인' onBackClick={() => onPressHardwareBackButton(true)} />
      <WebView
        ref={webviewRef}
        source={{
          uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}`,
        }}
        originWhitelist={['*']}
        style={{ flex: 1 }}
        allowsBackForwardNavigationGestures
        onMessage={({ nativeEvent }) => {
          const data = JSON.parse(nativeEvent.data);
          if (data.type === 'gotoMain') {
            setStorage('isLogin', 'true');
            setIsLogined('true');
          }
          if (data.type === 'gotoSignup') {
            const params = {
              login_type: data.login_type,
              sns_id: data.sns_id,
              user_id: data.user_id,
            };
            navigation.dispatch(insertBeforeLast('Signup', { isOauth: 1, ...params }));
            navigation.goBack();
          }
        }}
      />
    </View>
  );
}

export default KakaoLoginScreen;
