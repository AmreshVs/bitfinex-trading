import React from 'react';
import { View, StyleSheet } from 'react-native';

import theme from 'app/theme';

const Container = ({ children }) => {

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.background,
      borderTopWidth: 1,
      borderTopColor: theme.dark,
      borderBottomColor: theme.dark,
      borderBottomWidth: 1,
      padding: 10
    }
  });

  return (
    <View style={styles.container}>
      {children}
    </View>
  )
}

export default Container;