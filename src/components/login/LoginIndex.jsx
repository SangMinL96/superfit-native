import { Image } from 'expo-image';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Form from './Form';

function LoginIndex() {
  return (
    <View style={[styles.container]}>
      <View style={[styles.btnContainer]}>
        <TouchableOpacity style={[styles.user_type_active]}>
          <Text style={[styles.user_text]}>일반회원</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.user_type]}>
          <Text style={[styles.user_text]}>제휴회원</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.logoView]}>
        <Image style={[styles.image]} source={require('../../../assets/logo.png')} contentFit='contain' transition={1000} />
        <Text style={[styles.logoSubTitle]}>지금 로그인하여</Text>
        <Text style={[styles.logoSubTitle]}>슈퍼핏의 모든 서비스를 이용해보세요!</Text>
      </View>
      <Form />
    </View>
  );
}

export default LoginIndex;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },
  btnContainer: {
    width: '100%',
    marginTop: 10,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  user_type: {
    width: '50%',
    paddingTop: 17,
    paddingBottom: 17,
    justifyContent: 'center',
    borderBottomWidth: 3,
    borderBottomColor: '#eee',
  },
  user_type_active: {
    width: '50%',
    paddingTop: 17,
    paddingBottom: 17,
    justifyContent: 'center',
    borderBottomWidth: 3,
    borderBottomColor: '#333',
  },
  user_text: {
    width: '100%',
    textAlign: 'center',
    color: '#333',
    fontSize: 20,
    fontWeight: 'bold',
  },
  logoView: {
    width: '100%',
    height: '25%',
    padding: 30,
    marginBottom: '5%',
  },
  logoSubTitle: {
    fontSize: 20,
    marginTop: 5,
    fontWeight: '700',
    color: '#262626',
  },
  image: {
    justifyContent: 'flex-start',
    width: '60%',
    height: '60%',
  },
});
