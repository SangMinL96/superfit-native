import { Platform, SafeAreaView, View } from 'react-native';
import WebView from 'react-native-webview';
import { useDeviceBack } from '../hooks/useDeviceBack';
import theme from '../style/theme';
import { useRoute } from '@react-navigation/native';
import Header from '../common/ui/Header';
const domain = Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://127.0.0.1:3000';
function StackScreen() {
  const route = useRoute();
  const { url, headerName } = route.params;
  const { webviewRef, script, onNavigationStateChange, androidState, onPressHardwareBackButton } = useDeviceBack();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={theme.container}>
        <Header title={headerName || ''} onBackClick={() => onPressHardwareBackButton(true)} />
        <WebView
          ref={webviewRef}
          onNavigationStateChange={onNavigationStateChange}
          source={{
            uri: `${domain}${url}`,
          }}
          javaScriptEnabled
          originWhitelist={['*']}
          style={{ flex: 1 }}
          allowsBackForwardNavigationGestures
          injectedJavaScript={script}
          onMessage={({ nativeEvent: state }) => {
            androidState(state);
            // const data = jsonParse(state?.data);
            // if (data?.type === '') {
            // }
          }}
        />
      </View>
    </SafeAreaView>
  );
}

export default StackScreen;
