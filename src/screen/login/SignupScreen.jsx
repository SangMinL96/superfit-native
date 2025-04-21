import { useRoute } from '@react-navigation/native';
import { Platform, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';
import { jsonParse, setStorage } from '../../common/common';
import Header from '../../common/ui/Header';
import { useNextDeviceBack } from '../../hooks/useDeviceBack';
import { useGlobalState } from '../../store/useGlobalState';
import theme from '../../style/theme';
const URL = Platform.OS === 'android' ? 'http://192.168.25.61:3000' : 'http://127.0.0.1:3000';

function SignupScreen() {
  const setIsLogined = useGlobalState(state => state.setIsLogined);
  const { isOauth = '0', login_type, sns_id, step, infoData } = useRoute().params;
  const asPath = `/signup?step=${step}&isOauth=${isOauth}&login_type=${login_type}&sns_id=${sns_id}&${infoQuery}`;
  const { webviewRef, onPressHardwareBackButton, onStackBack } = useNextDeviceBack(asPath);
  const infoQuery = `email=${infoData?.email}&gender=${infoData?.gender}&nickname=${infoData?.nickname}&hp=${infoData?.hp}`;
  return (
    <SafeAreaView style={theme.container}>
      <Header title='회원가입' onBackClick={() => onPressHardwareBackButton()} />
      <WebView
        ref={webviewRef}
        source={{
          uri: `${URL}${asPath}`,
          d,
        }}
        javaScriptEnabled
        originWhitelist={['*']}
        style={{ flex: 1 }}
        allowsBackForwardNavigationGestures
        onMessage={({ nativeEvent: state }) => {
          onStackBack(state);
          const data = jsonParse(state?.data);
          if (data?.type === 'gotoMain') {
            setStorage('isLogin', 'true');
            setIsLogined('true');
          }
        }}
      />
    </SafeAreaView>
  );
}

export default SignupScreen;
