import { SafeAreaView } from 'react-native-safe-area-context';
import { useLoginState } from '../../store/useLoginState';
import LoginIndex from '../../components/login/LoginIndex';

function LoginScreen() {
  const [setEmail, email] = useLoginState(state => [state.setEmail, state.email]);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LoginIndex />
    </SafeAreaView>
  );
}

export default LoginScreen;
