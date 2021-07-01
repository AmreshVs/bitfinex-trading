import React from 'react';
import { View, StyleSheet } from 'react-native';

import theme from 'app/theme';

const Background = ({ children, light, style, ...otherStyles }) => {

  const styles = StyleSheet.create({
    container: {
      backgroundColor: light ? theme.backgroundSecondary : theme.background,
      ...style,
      ...otherStyles
    }
  });

  return (
    <View style={styles.container}>
      {children}
    </View>
  )
}

export default Background;
