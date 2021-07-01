import React from "react";
import { View, StyleSheet } from "react-native";
import { useSelector } from 'react-redux';

import Item from './Item';

export default function AsksTable() {

  const asksState = useSelector(state => state.asksData);

  return (
    <View style={styles.container}>
      {asksState.map((item, index) => {
        return <Item
          item={item}
          index={index}
          key={item.price}
          type='asks'
        />
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusIcon: {
    width: 5
  },
});
