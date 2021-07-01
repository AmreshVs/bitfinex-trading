import React, { memo } from 'react';
import { View, StyleSheet, Text, useWindowDimensions } from 'react-native';
import { useSelector } from 'react-redux';

import Row from 'app/components/Row';
import theme from 'app/theme';
import { formatNumber } from "app/commonFunctions";

const Item = ({ item, index, type = 'bids' }) => {

  let state = useSelector(state => type == 'bids' ? state.bidsData : state.asksData);
  let width = useWindowDimensions().width / 4;

  if (index == 0) {
    if (type == 'bids') {
      return (
        <View style={[styles.item]}>
          <Text style={[styles.headerTitle, { width }, styles.firstItem]}>TOTAL</Text>
          <Text style={[styles.headerTitle, { width }, styles.lastItem]}>PRICE</Text>
        </View>
      );
    }

    return (
      <View style={[styles.item]}>
        <Text style={[styles.headerTitle, { width }, styles.firstItem]}>PRICE</Text>
        <Text style={[styles.headerTitle, { width }, styles.lastItem]}>TOTAL</Text>
      </View>
    );

  }

  return (
    <View style={[styles.item]}>
      <View style={type == 'bids' ? styles.askContainer : styles.bidContainer}>
        <View style={[type == 'bids' ? styles.green : styles.red, { width: `${(100 * item.total / state[state.length - 1].total).toFixed(0)}%` }]} />
        <Row>
          <Text style={[styles.title, { width }, styles.firstItem]}>{item.total}</Text>
          <Text style={[styles.title, { width }, styles.lastItem]}>{formatNumber(item.price)}</Text>
        </Row>
      </View>
    </View>
  )
}

export default memo(Item);

const styles = StyleSheet.create({
  item: {
    marginHorizontal: 10,
    display: 'flex',
    flexDirection: 'row',
    overflow: 'scroll',
    flexWrap: 'nowrap',
  },
  title: {
    fontSize: 16,
    padding: 10,
    color: theme.white,
    textAlign: 'center'
  },
  headerTitle: {
    fontSize: 16,
    padding: 10,
    textAlign: 'center',
    color: theme.lightGray
  },
  firstItem: {
    textAlign: 'left',
  },
  lastItem: {
    textAlign: 'right',
  },
  askContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  red: {
    position: 'absolute',
    backgroundColor: 'red',
    width: '100%',
    height: '100%',
    zIndex: 0,
    opacity: 0.2,
  },
  bidsContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  green: {
    position: 'absolute',
    backgroundColor: 'limegreen',
    width: '100%',
    height: '100%',
    zIndex: 0,
    opacity: 0.2,
    right: 0
  },
})