import { useRoute } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import GeneralForm from '../../components/signup/GeneralForm';
import { useLoginState } from '../../store/useLoginState';

function RequiredScreen({}) {
  const [email] = useLoginState(state => [state.email]);
  const route = useRoute();
  const { loginType = 'general' } = route.params;
  return <View style={[styles.container]}>{loginType === 'general' && <GeneralForm />}</View>;
}

export default RequiredScreen;

const styles = StyleSheet.create({
  container: { backgroundColor: 'white', flex: 1 },
});
