import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function Form() {
  const navigation = useNavigation();

  const handleKakaoLogin = async () => {
    navigation.navigate('kakaoLogin');
    //
  };

  return (
    <View style={[styles.container]}>
      <TouchableOpacity style={[styles.LoginButton, { backgroundColor: 'rgb(254,229,0)' }]} onPress={handleKakaoLogin}>
        <Icon name='chat' size={24} style={[styles.icon]} />
        <Text style={[styles.LoginButtonText, { color: '#262626' }]}>카카오 로그인</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.LoginButton, { backgroundColor: 'rgb(26,206,96)' }]} onPress={() => navigation.navigate('naverLogin')}>
        <Icon name='netflix' size={24} style={[styles.icon]} />
        <Text style={[styles.LoginButtonText]}>네이버 로그인</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.LoginButton, { backgroundColor: '#0028ef' }]} onPress={() => navigation.navigate('nomalLogin', { loginType: 'basic' })}>
        <Text style={[styles.LoginButtonText]}>일반 로그인</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Form;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 30,
    alignItems: 'center',
  },

  LoginButton: {
    position: 'relative',
    width: '100%',
    height: 50,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  icon: {
    position: 'absolute',
    left: 15,
  },
  kakaoImage: {
    width: '100%',
    height: 50,
    borderRadius: 12,
  },
  LoginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  SignButton: {
    width: '100%',
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    marginTop: 10,
    borderColor: '#dfdfdf',
    borderWidth: 1,
  },
  SignButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#4a4a4a',
  },
});
