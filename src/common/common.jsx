import { LayoutAnimation } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const animateLayout = (duration = 300) => {
  return LayoutAnimation.configureNext({
    delete: LayoutAnimation.Presets.linear.delete,
    create: LayoutAnimation.Presets.linear.create,
    update: LayoutAnimation.Presets.linear.update,
    duration,
  });
};
export const insertBeforeLast = (routeName, params) => state => {
  const routes = [...state.routes.slice(0, -1), { name: routeName, params }, state.routes[state.routes.length - 1]];
  return CommonActions.reset({
    ...state,
    routes,
    index: routes.length - 1,
  });
};

export const getStorage = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (e) {
    return '';
  }
};

export const setStorage = async (key, value, isJson = false) => {
  try {
    if (isJson) {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } else {
      await AsyncStorage.setItem(key, value);
    }
  } catch (e) {
    return;
  }
};

export const jsonParse = str => {
  try {
    const obj = JSON.parse(str);
    if (obj && typeof obj === `object`) {
      return JSON.parse(str);
    }
  } catch (err) {
    return str;
  }
  return str;
};
