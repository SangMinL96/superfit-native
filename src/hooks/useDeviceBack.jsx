import { useNavigation } from '@react-navigation/native';
import { useEffect, useRef, useState } from 'react';
import { BackHandler } from 'react-native';

export const useDeviceBack = () => {
  const navigate = useNavigation();
  const webviewRef = useRef();
  const [isCanGoBack, setIsCanGoBack] = useState(false);
  console.log(isCanGoBack);
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
  const onNavigationStateChange = (navState) => {
    setIsCanGoBack(navState.canGoBack);
  };

  const script = `
  (function() {
    function wrap(fn) {
      return function wrapper() {
        var res = fn.apply(this, arguments);
        window.ReactNativeWebView.postMessage('navigationStateChange');
        return res;
      }
    }

    history.pushState = wrap(history.pushState);
    history.replaceState = wrap(history.replaceState);
    window.addEventListener('popstate', function() {
      window.ReactNativeWebView.postMessage('navigationStateChange');
    });
  })();

  true;
`;
  const androidState = (state) => {
    if (state.data === 'navigationStateChange') {
      setIsCanGoBack(state.canGoBack);
    }
  };
  return { onNavigationStateChange, webviewRef, onPressHardwareBackButton, script, androidState };
};
