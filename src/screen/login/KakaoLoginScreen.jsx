import { KAKAO_REST_API_KEY } from '@env';
import { useNavigation } from '@react-navigation/native';
import { Platform, View } from 'react-native';
import WebView from 'react-native-webview';
import { shallow } from 'zustand/shallow';
import { useGlobalState } from '../../store/useGlobalState';
import { useDeviceBack } from '../../hooks/useDeviceBack';
import { insertBeforeLast, setStorage } from '../../common/common';
import Header from '../../common/ui/Header';
import theme from '../../style/theme';
const URL = Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://127.0.0.1:3000';
const REDIRECT_URI = `${URL}/oauth/kakao/callback`;
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
        javaScriptEnabled={true}
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
              step: 2,
              isOauth: 1,
              login_type: data.loginType,
              sns_id: data.snsId,
              infoData: data.infoData,
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
