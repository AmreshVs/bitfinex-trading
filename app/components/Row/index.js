import React from 'react';
import { View, StyleSheet } from 'react-native';

const Row = ({ children, vcenter, hcenter, gap, style, ...otherStyles }) => {

  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: vcenter ? 'center' : 'flex-start',
      justifyContent: hcenter ? 'center' : 'flex-start',
      ...otherStyles
    }
  });

  return (
    <View style={[styles.container, style]}>
      {gap ?
        children.map((child, index) => {
          return <View style={{ marginRight: gap }} key={'row-' + index}>{child}</View>
        })
        : children}
    </View>
  )
}

export default Row;