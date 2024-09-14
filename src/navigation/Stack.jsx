import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screen/login/LoginScreen';
import RequiredScreen from '../screen/login/RequiredScreen';
import SignupScreen from '../screen/login/SignupScreen';
import KakaoLoginScreen from '../screen/login/KakaoLoginScreen';
import NaverLoginScreen from '../screen/login/NaverLoginScreen';
import Tabs from './Tab';
import PhoneLoginScreen from '../screen/login/PhoneLoginScreen';
import { useGlobalState } from '../store/useGlobalState';
import { useLayoutEffect } from 'react';
import { getStorage, setStorage } from '../common/common';

const Stack = createNativeStackNavigator();

function Stacks() {
  const [isLogined, setIsLogined] = useGlobalState(state => [state.isLogined, state.setIsLogined]);

  const onLoginCheck = async () => {
    const isLogin = await getStorage('isLogin');
    setIsLogined(isLogin);
    setStorage('isLogin', 'false');
  };
  useLayoutEffect(() => {
    onLoginCheck();
  }, [isLogined]);
  return (
    <Stack.Navigator
      initialRouteName={'Main'}
      screenOptions={{
        headerShown: false,
      }}
    >
      {isLogined === 'true' ? (
        <>
          <Stack.Screen name='Main' component={Tabs} />
        </>
      ) : (
        <>
          <Stack.Screen name='Login' options={{ headerShown: false }} component={LoginScreen} />
          <Stack.Screen name='required' options={{ headerTitle: '필수 정보' }} component={RequiredScreen} />
          <Stack.Screen
            name='Signup'
            options={{ headerTitle: '회원가입', animationTypeForReplace: isLogined === 'true' ? 'pop' : 'push' }}
            component={SignupScreen}
          />
          <Stack.Screen name='phoneLogin' options={{ headerTitle: '휴대폰 로그인' }} component={PhoneLoginScreen} />
          <Stack.Screen name='kakaoLogin' options={{ headerTitle: '카카오 로그인' }} component={KakaoLoginScreen} />
          <Stack.Screen name='naverLogin' options={{ headerTitle: '네이버 로그인' }} component={NaverLoginScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default Stacks;
