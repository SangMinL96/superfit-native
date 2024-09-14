import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect } from 'react';
import { SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { useLoginState } from '../../store/useLoginState';

function AgreeScreen() {
  const navi = useNavigation();
  const route = useRoute();
  const [setEmail, email] = useLoginState(state => [state.setEmail, state.email]);
  console.log(email);
  useEffect(() => {
    setEmail('hwon379@gmail.com');
    return () => setEmail('');
  }, []);
  return (
    <SafeAreaView>
      <TouchableOpacity onPress={() => navi.navigate('required', route.params)}>
        <Text>ㅇㄹㅁㅇ</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default AgreeScreen;
