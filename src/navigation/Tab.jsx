import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screen/main/HomeScreen';
import ScheduleScreen from '../screen/main/ScheduleScreen';
import CreateScreen from '../screen/main/CreateScreen';
import ProfileScreen from '../screen/main/ProfileScreen';
const Tab = createBottomTabNavigator();
function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Schdule') {
            iconName = focused ? 'calendar-clear' : 'calendar-clear-outline';
          } else if (route.name === 'Create') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
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
      <Tab.Screen name='Schdule' component={ScheduleScreen} options={{ title: '일정' }} />
      <Tab.Screen name='Create' component={CreateScreen} options={{ title: '생성' }} />
      <Tab.Screen name='Profile' component={ProfileScreen} options={{ title: '내정보' }} />
    </Tab.Navigator>
  );
}

export default Tabs;
