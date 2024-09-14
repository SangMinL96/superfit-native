import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';
import Stacks from './src/navigation/Stack';

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1 }}>
        <Stacks />
      </SafeAreaView>
    </NavigationContainer>
  );
}

