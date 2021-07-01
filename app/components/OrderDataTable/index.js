import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { useSelector } from 'react-redux';

import Row from "app/components/Row";
import Text from 'app/components/Text';
import BidsTable from "./BidsTable";
import AsksTable from "./AsksTable";

export default function OrderDataTable() {

  let globalState = useSelector(state => state);

  return (
    <View style={styles.container}>
      {(globalState.asksData.length <= 0 && globalState.bidsData.length <= 0)
        ?
        <Text textAlign='center' padding={10}>No Data!</Text>
        :
        <ScrollView
          removeClippedSubviews={true}
        >
          <Row>
            <BidsTable />
            <AsksTable />
          </Row>
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