import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';
import WebView from 'react-native-webview';
import { shallow } from 'zustand/shallow';
import { useGlobalState } from '../../store/useGlobalState';
import { useNextDeviceBack } from '../../hooks/useDeviceBack';
import { insertBeforeLast, jsonParse, setStorage } from '../../common/common';
import Header from '../../common/ui/Header';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function NomalLoginScreen() {
  const route = useRoute();
  const { loginType = 'basic' } = route.params;
  const navigation = useNavigation();
  const { webviewRef, onPressHardwareBackButton, onStackBack } = useNextDeviceBack(`/signin?loginType=${loginType}`);
  const [setIsLogined] = useGlobalState(state => [state.setIsLogined], shallow);
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white', paddingTop: insets.top }}>
      <Header title={'슈퍼핏 로그인'} onBackClick={() => onPressHardwareBackButton()} />
      <WebView
        ref={webviewRef}
        source={{
          uri: `http://192.168.25.61:3000/signin?loginType=${loginType}`,
        }}
        originWhitelist={['*']}
        style={{ flex: 1 }}
        allowsBackForwardNavigationGestures
        onMessage={({ nativeEvent: state }) => {
          onStackBack(state);
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

export default NomalLoginScreen;
