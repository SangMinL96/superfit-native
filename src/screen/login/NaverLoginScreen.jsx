import { useNavigation } from '@react-navigation/native';
import { NAVER_CLIENT_ID, NAVER_INCODE_STATE } from '@env';
import { View } from 'react-native';
import WebView from 'react-native-webview';
import { shallow } from 'zustand/shallow';
import { useGlobalState } from '../../store/useGlobalState';
import { useDeviceBack } from '../../hooks/useDeviceBack';
import { insertBeforeLast, setStorage } from '../../common/common';
import Header from '../../common/ui/Header';
import theme from '../../style/theme';
import { Platform } from 'react-native';
const URL = Platform.OS === 'android' ? 'http://192.168.25.61:3000' : 'http://127.0.0.1:3000';
const REDIRECT_URI = `${URL}/oauth/naver/callback`;
function NaverLoginScreen() {
  const navigation = useNavigation();
  const [setIsLogined] = useGlobalState(state => [state.setIsLogined], shallow);

  const { webviewRef, onPressHardwareBackButton } = useDeviceBack();
  return (
    <View style={theme.container}>
      <Header title='네이버 로그인' onBackClick={() => onPressHardwareBackButton(true)} />
      <WebView
        ref={webviewRef}
        source={{
          uri: `https://nid.naver.com/oauth2.0/authorize?client_id=${NAVER_CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&state=${NAVER_INCODE_STATE}`,
        }}
        javaScriptEnabled={true}
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
              step: 2,
              isOauth: 1,
              login_type: data.login_type,
              sns_id: data.sns_id,
              user_id: data.user_id,
            };
            navigation.dispatch(insertBeforeLast('Signup', params));
            navigation.goBack();
          }
        }}
      />
    </View>
  );
}

export default NaverLoginScreen;
