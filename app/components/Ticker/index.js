import React from "react";
import { View, StyleSheet } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

import Text from 'app/components/Text';
import theme from "app/theme";
import Row from 'app/components/Row';
import Column from 'app/components/Column';
import Container from "../Container";
import { formatNumber } from "app/commonFunctions";

export default function Ticker({ state }) {

  let color = String(state.priceChange)[0] == '-' ? theme.red : theme.green;

  return (
    <Container>
      <Row justifyContent='space-between'>
        <View>
          <Row vcenter>
            <Ionicons
              style={styles.bitcoinIcon}
              name='logo-bitcoin'
              size={45}
              color={theme.white}
            />
            <Column gap={4}>
              <Row gap={5} vcenter>
                <Text size="big">
                  BTC/USD
                </Text>
                <Ionicons
                  name='information-circle-outline'
                  size={25}
                  color={theme.white}
                />
                <Text
                  color={theme.accent}
                >
                  10X
                </Text>
              </Row>
              <Row>
                <Text
                  marginRight={10}
                  gray
                >
                  VOL
                </Text>
                <Text>{formatNumber(state.volume24h.toFixed(0))}</Text>
                <Text
                  marginLeft={2}
                  underline
                  gray
                >
                  BTC
                </Text>
              </Row>
              <Row>
                <Text
                  marginRight={10}
                  gray
                >
                  LOW
                </Text>
                <Text>{formatNumber(state.low)}</Text>
              </Row>
            </Column>
          </Row>
        </View>
        <View>
          <Column gap={4}>
            <Text textAlign='right'>{formatNumber(state.lastPrice)}</Text>
            <Row justifyContent='flex-end'>
              <Text
                color={color}
                marginRight={5}
              >
                {Math.abs(state.priceChange)}
              </Text>
              <Ionicons
                name={String(state.priceChange)[0] == '-' ? 'caret-down' : 'caret-up'}
                size={20}
                color={color}
              />
              <Text
                color={color}
                marginLeft={5}
              >
                ({Number(formatNumber(Math.abs(state.priceChange || 0) * 100)).toFixed(2)} %)
              </Text>
            </Row>
            <Row justifyContent='flex-end'>
              <Text
                marginRight={10}
                gray
              >
                HIGH
              </Text>
              <Text>{formatNumber(state.high)}</Text>
            </Row>
          </Column>
        </View>
      </Row>
    </Container>
  )
}

const styles = StyleSheet.create({
  bitcoinIcon: {
    marginRight: 10
  },
});