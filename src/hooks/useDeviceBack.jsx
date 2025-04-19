import { useNavigation } from '@react-navigation/native';
import { useEffect, useRef, useState } from 'react';
import { BackHandler } from 'react-native';

export const useDeviceBack = () => {
  const navigate = useNavigation();
  const webviewRef = useRef();
  const [isCanGoBack, setIsCanGoBack] = useState(false);
  const onPressHardwareBackButton = (isBackbutton = false) => {
    if (webviewRef.current && isCanGoBack) {
      setTimeout(() => webviewRef.current?.goBack(), 100);
      return true;
    } else {
      if (isBackbutton) {
        setTimeout(() => navigate.goBack(), 100);
      }
      return false;
    }
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onPressHardwareBackButton);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onPressHardwareBackButton);
    };
  }, [isCanGoBack]);
  const onNavigationStateChange = navState => {
    setIsCanGoBack(navState.canGoBack);
  };
  return { onNavigationStateChange, webviewRef, onPressHardwareBackButton };
};

export const useNextDeviceBack = url => {
  const navigate = useNavigation();
  const webviewRef = useRef();
  const onPressHardwareBackButton = () => {
    const jsCode = `window.routerBack('${url}'); true;`;
    webviewRef.current.injectJavaScript(jsCode);
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onPressHardwareBackButton);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onPressHardwareBackButton);
    };
  }, []);
  const onStackBack = state => {
    if (state.data === 'stackBack') {
      setTimeout(() => navigate.goBack(), 100);
    }
  };
  return { webviewRef, onPressHardwareBackButton, onStackBack };
};
