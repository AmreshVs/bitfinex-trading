import React from "react";
import { View, StyleSheet } from "react-native";
import { useSelector } from 'react-redux';

import Item from './Item';

export default function BidsTable() {

  let bidsState = useSelector(state => state.bidsData);

  return (
    <View style={styles.container}>
      {bidsState.map((item, index) => {
        return <Item
          item={item}
          index={index}
          key={item.price}
        />
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});