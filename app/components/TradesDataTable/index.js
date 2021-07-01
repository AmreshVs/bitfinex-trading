import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import Text from 'app/components/Text';
import Item from './Item';

export default function TradesDataTable() {

  let state = useSelector(state => state.tradesData);

  let count = 0;
  return (
    <View style={styles.container}>
      {(state.length <= 0)
        ?
        <Text textAlign='center' padding={10}>No Data!</Text>
        :
        <ScrollView>
          {state.map((item, index) => {
            let key = item.period + item.timestamp + item.amount + item.price + count;

            if (state[index - 1]) {
              key = key + (parseFloat(state[index - 1].amount) + parseFloat(state[index - 1].period) + state[index - 1].timestamp);
              key = key + count;
            }
            count++;

            return <Item item={item} index={index} key={key} />
          })}
        </ScrollView>
      }
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});