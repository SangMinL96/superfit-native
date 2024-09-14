import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screen/Home/HomeScreen';
const Tab = createBottomTabNavigator();
function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Map') {
            iconName = focused ? 'ios-location' : 'ios-location-outline';
          } else if (route.name === 'Notice') {
            iconName = focused ? 'notifications' : 'notifications-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person-circle' : 'person-circle-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerShown: false,
        tabBarActiveTintColor: '#262626',
        tabBarStyle: { paddingBottom: 3 },
        tabBarIconStyle: { marginBottom: -3 },
        tabBarInactiveTintColor: '#aeaeae',
      })}
    >
      <Tab.Screen name='Home' component={HomeScreen} options={{ title: '홈' }} />
    </Tab.Navigator>
  );
}

export default Tabs;
