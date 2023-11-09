import React from 'react'; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import Activities from './components/Activities';
import History from './components/History'


const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Activities') {
              iconName = 'md-home-sharp';
            } else if (route.name === 'History') {
              iconName = 'checkmark-circle'; 
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen
          name="Activities"
          component={Activities}
          options={{ title: 'Activities' }}
        />
        <Tab.Screen
          name="History"
          component={History}
          options={{ title: 'History' }} 
        />
              </Tab.Navigator>
    </NavigationContainer>
  );
}
