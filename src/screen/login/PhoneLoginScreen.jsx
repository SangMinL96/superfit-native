import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';
import WebView from 'react-native-webview';
import { shallow } from 'zustand/shallow';
import { useGlobalState } from '../../store/useGlobalState';
import { useDeviceBack } from '../../hooks/useDeviceBack';
import { insertBeforeLast, jsonParse, setStorage } from '../../common/common';
import Header from '../../common/ui/Header';
import theme from '../../style/theme'

function PhoneLogin() {
  const navigation = useNavigation();
  const { webviewRef, script, onNavigationStateChange, androidState, onPressHardwareBackButton } = useDeviceBack();
  const [setIsLogined] = useGlobalState(state => [state.setIsLogined], shallow);
  return (
    <SafeAreaView style={theme.container}>
      <Header title={'휴대폰 로그인'} onBackClick={() => onPressHardwareBackButton(true)} />
      <WebView
        ref={webviewRef}
        onNavigationStateChange={onNavigationStateChange}
        source={{
          uri: `http://127.0.0.1:3000/login?step=1`,
        }}
        originWhitelist={['*']}
        style={{ flex: 1 }}
        allowsBackForwardNavigationGestures
        injectedJavaScript={script}
        onMessage={({ nativeEvent: state }) => {
          androidState(state);
          const data = jsonParse(state.data);
          if (data.type === 'goBack') {
            navigation.goBack();
          }
          if (data.type === 'gotoMain') {
            setStorage('isLogin', 'true');
            setIsLogined('true');
          }
          if (data.type === 'gotoSignup') {
            const params = {
              loginType: 'nomal',
            };
            navigation.dispatch(insertBeforeLast('Signup', { isOauth: 0, ...params }));
            navigation.goBack();
          }
        }}
      />
    </SafeAreaView>
  );
}

export default PhoneLogin;
