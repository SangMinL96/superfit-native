import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';
import { useGlobalState } from '../../store/useGlobalState';
import { useDeviceBack } from '../../hooks/useDeviceBack';
import Header from '../../common/ui/Header';
import { jsonParse, setStorage } from '../../common/common';
import theme from '../../style/theme';
import { Platform } from 'react-native';
const URL = Platform.OS === 'android' ? 'http://192.168.25.61:3000' : 'http://127.0.0.1:3000';

function SignupScreen() {
  const setIsLogined = useGlobalState(state => state.setIsLogined);
  const { isOauth = '0', login_type, sns_id, user_id, step, infoData } = useRoute().params;
  const { webviewRef, script, onNavigationStateChange, androidState, onPressHardwareBackButton } = useDeviceBack();
  const infoQuery = `email=${infoData?.email}&gender=${infoData?.gender}&nickname=${infoData?.nickname}`;
  return (
    <SafeAreaView style={theme.container}>
      <Header title='회원가입' onBackClick={() => onPressHardwareBackButton(true)} />
      <WebView
        ref={webviewRef}
        onNavigationStateChange={onNavigationStateChange}
        source={{
          uri: `${URL}/signup?step=${step}&isOauth=${isOauth}&login_type=${login_type}&sns_id=${sns_id}&user_id=${user_id}&${infoQuery}`,
        }}
        javaScriptEnabled
        originWhitelist={['*']}
        style={{ flex: 1 }}
        allowsBackForwardNavigationGestures
        injectedJavaScript={script}
        onMessage={({ nativeEvent: state }) => {
          androidState(state);
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
