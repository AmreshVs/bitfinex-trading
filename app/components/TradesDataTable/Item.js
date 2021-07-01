import React, { memo } from 'react';
import { View, StyleSheet, Text, useWindowDimensions } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import theme from 'app/theme';

const Item = ({ item, index }) => {

  let width = useWindowDimensions().width / 3;

  if (index == 0) {
    return (
      <View style={[styles.item]}>
        <Text style={[styles.headerTitle, { width }, styles.firstItem]}>TIME</Text>
        <Text style={[styles.headerTitle, { width }]}>PRICE</Text>
        <Text style={[styles.headerTitle, { width }, styles.lastItem]}>AMOUNT</Text>
      </View>
    );

  }

  return (
    <View style={[styles.item]}>
      <View style={[String(item.amount)[0] == '-' ? styles.red : styles.green, { width: '100%', opacity: parseFloat("0." + Math.ceil(Math.abs(item.amount))) }]} />
      <Text style={[styles.title, styles.firstItem, { width }]}>
        <Ionicons name={String(item.amount)[0] != '-' ? 'caret-up' : 'caret-down'} size={15} color={String(item.amount)[0] != '-' ? 'limegreen' : 'red'} />
        <View style={styles.statusIcon} />
        {item.formattedTimestamp}
      </Text>
      <Text style={[styles.title, { width }]}>{item.price}</Text>
      <Text style={[styles.title, { width }, styles.lastItem]}>{Math.abs(item.amount).toFixed(4)}</Text>
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
  statusIcon: {
    width: 5
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