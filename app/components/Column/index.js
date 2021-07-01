import React from 'react';
import { View, StyleSheet } from 'react-native';

const Column = ({ children, gap }) => {
  return (
    <View style={styles.container}>
      {gap ?
        children.map((child, index) => {
          return <View style={{ marginBottom: gap }} key={'col-' + index}>{child}</View>
        })
        : children}
    </View>
  )
}

export default Column;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
  }
});