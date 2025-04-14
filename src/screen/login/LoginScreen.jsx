import { SafeAreaView } from 'react-native-safe-area-context';
import LoginIndex from '../../components/login/LoginIndex';

function LoginScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LoginIndex />
    </SafeAreaView>
  );
}

export default LoginScreen;
