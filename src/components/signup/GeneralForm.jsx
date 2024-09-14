import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

function GeneralForm() {
  return (
    <View style={[styles.container]}>
      <View style={[styles.inputView]}>
        <Text style={[styles.inputText]}>이메일</Text>
        <TextInput style={[styles.input]} placeholder='이메일을 입력해주세요' returnKeyType='next' />
        <Text style={[styles.InputDesc]}>* 이메일 형식으로 입력해주세요.</Text>
      </View>
      <View style={[styles.inputView]}>
        <Text style={[styles.inputText]}>비밀번호</Text>
        <TextInput style={[styles.input]} placeholder='비밀번호를 입력해주세요' secureTextEntry returnKeyType='done' />
        <Text style={[styles.InputDesc]}>* 영문+특수문자를 포함한 8자리 이상 입력해주세요.</Text>
      </View>
      <View style={[styles.inputView]}>
        <Text style={[styles.inputText]}>비밀번호 확인</Text>
        <TextInput style={[styles.input]} placeholder='비밀번호 확인해주세요' secureTextEntry returnKeyType='done' />
      </View>
      {/* 구분선 */}
      <View style={[styles.divide]} />
      {/* ----- */}
      <View style={[styles.inputView]}>
        <Text style={[styles.inputText]}>이름</Text>
        <TextInput style={[styles.input]} returnKeyType='next' />
      </View>
    </View>
  );
}

export default GeneralForm;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '45%',
    padding: 15,
    alignItems: 'center',
  },
  inputView: {
    width: '80%',
    marginBottom: 15,
  },
  inputText: {
    color: '#262626',
    fontWeight: '700',
    fontSize: 11,
  },
  divide: {
    borderColor: '#eeeeee',
    borderWidth: 1,
    width: '80%',
    marginTop: 10,
    marginBottom: 25,
  },
  input: {
    borderColor: '#dfdfdf',
    borderWidth: 1,
    marginTop: 5,
    borderRadius: 8,
    width: '100%',
    height: 40,
    paddingLeft: 10,
    paddingRight: 10,
  },

  InputDesc: {
    fontSize: 9,
    marginTop: 5,
  },
});
