import theme from 'app/theme/index';
import React from 'react';
import { Text, StyleSheet } from 'react-native';

const index = ({ children, gray, underline, bold, size = 'small', ...otherStyles }) => {

  const styles = StyleSheet.create({
    textStyle: {
      color: gray ? theme.lightGray : theme.white,
      fontSize: size === 'big' ? 19 : 16,
      fontWeight: bold ? 'bold' : 'normal',
      textDecorationLine: underline ? 'underline' : 'none',
      ...otherStyles
    }
  });

  return (
    <Text style={styles.textStyle}>
      {children}
    </Text>
  )
}

export default index;