import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from 'app/screens/Home';
import screenNames from './screenNames';
import theme from 'app/theme/index';

const Stack = createStackNavigator();

export default function HomeStackNavigator() {

  return (
    <Stack.Navigator
      screenOptions={{
        title: 'Trading',
        headerStyle: {
          backgroundColor: theme.background,
          borderBottomWidth: 1,
          borderBottomColor: theme.dark
        },
        headerTintColor: theme.white,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTitleAlign: 'center'
      }}
    >
      <Stack.Screen
        name={screenNames.STACK_HOME}
        component={Home}
      />
    </Stack.Navigator>
  )
}