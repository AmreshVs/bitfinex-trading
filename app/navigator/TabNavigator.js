import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';


import HomeStackNavigator from './HomeStackNavigator';
import screenNames from './screenNames';
import theme from 'app/theme/index';


export default function TabNavigator() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === screenNames.TAB_HOME) {
            iconName = 'analytics-outline';
          } else if (route.name === 'Settings') {
            iconName = 'ios-list';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: theme.primary,
        inactiveTintColor: '#e5ebef',
        style: {
          backgroundColor: theme.background,
          borderTopColor: theme.gray,
          paddingBottom: 5,
          paddingTop: 10,
          height: 60,
        }
      }}
      tabStyle={{
        backgroundColor: theme.background
      }}
    >
      <Tab.Screen name={screenNames.TAB_HOME} component={HomeStackNavigator} />
    </Tab.Navigator>
  )
}
