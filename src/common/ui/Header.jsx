import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

function Header({ title, rightComponent, onBackClick }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBackClick}>
        <Ionicons name='chevron-back-sharp' size={28} color='black' />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <View>{rightComponent}</View>
    </View>
  );
}

export default Header;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    borderBottomColor: '#eeeeee',
    borderBottomWidth: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  title: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 18,
    marginLeft: 100,
    marginRight: 100,
    fontWeight: '500',
  },
});
