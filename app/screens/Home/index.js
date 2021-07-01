import React, { useState } from 'react';
import { StyleSheet, Button, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import Ionicons from '@expo/vector-icons/Ionicons';

import Background from 'app/components/Background';
import theme from 'app/theme';
import OrderDataTable from 'app/components/OrderDataTable';
import TradesDataTable from 'app/components/TradesDataTable';
import Ticker from 'app/components/Ticker';
import Accordian from 'app/components/Accordian';
import Row from 'app/components/Row';
import Column from 'app/components/Column';
import { updateTrades } from 'app/redux/actions/tradesActions';
import { clearBids, updateBids } from 'app/redux/actions/bidsAction';
import { clearAsks, updateAsks } from 'app/redux/actions/asksAction';

let ws;
let i;
export default function Home() {

  const dispatch = useDispatch();

  const [state, setState] = useState({
    connectionReady: true,
    isConnected: false,
    pres: 'P0',
    volume24h: 0,
    lastPrice: 0,
    priceChange: 0,
    high: 0,
    low: 0
  })

  const handleConnection = () => {

    ws = new WebSocket('wss://api-pub.bitfinex.com/ws/2');

    ws.onopen = () => onConnectionEstablished();

    ws.onmessage = (event) => onMessageRecieved(event);

    ws.onerror = (error) => { console.log('error', error) }
    ws.onclose = () => onConnectionClosed();

    let payloadData = {};

    function onConnectionEstablished(e) {
      console.log('connected');
      setState({ ...state, isConnected: true, connectionReady: true });

      let bookRequest = JSON.stringify({
        event: 'subscribe',
        channel: 'book',
        symbol: 'tBTCUSD',
        prec: state.pres,
        len: "1"
      })

      let tradesRequest = JSON.stringify({
        "event": "subscribe",
        "channel": "trades",
        "symbol": "tBTCUSD"
      })

      let tickerRequest = JSON.stringify({
        "event": "subscribe",
        "channel": "ticker",
        "symbol": "tBTCUSD"
      })

      ws.send(tickerRequest);
      ws.send(tradesRequest);
      ws.send(bookRequest);
    }

    function onConnectionClosed(e) {
      console.log('closed');
      console.log(e);
      handleDisconnection();
    }

    function onMessageRecieved(e) {
      payloadData = JSON.parse(e.data);

      if (!payloadData.event && Array.isArray(payloadData[1]) && payloadData[1].length === 3) {
        // Order book data
        let bookOrderData = {
          price: parseFloat(payloadData[1][0]).toFixed(1),
          amount: parseFloat(payloadData[1][2]).toFixed(2),
          total: parseFloat(0).toFixed(2),
        }
        if (bookOrderData.amount > 0) {
          dispatch(updateBids(bookOrderData));
        }
        else {
          dispatch(updateAsks(bookOrderData));
        }
      }

      if (!payloadData.event && Array.isArray(payloadData[2]) && payloadData.length === 3) {
        // Trades data
        let tradeArray = [];
        let tradeData = {
          price: parseFloat(payloadData[2][3]).toFixed(1),
          amount: payloadData[2][2],
          timestamp: payloadData[2][1],
          period: payloadData[2][0]
        }

        tradeArray.push(tradeData);
        dispatch(updateTrades(tradeArray));
      }

      if (!payloadData.event && Array.isArray(payloadData[1]) && payloadData[1].length === 10) {
        // ticker data
        setState({
          ...state,
          isConnected: true,
          volume24h: payloadData[1][7],
          lastPrice: payloadData[1][0],
          priceChange: payloadData[1][5],
          high: payloadData[1][8],
          low: payloadData[1][9],
        });
      }

      i++;
    }

  }

  const handleDisconnection = () => {
    ws.close();
    i = 0;
    setState({ ...state, isConnected: false });
  }

  const morePrecision = () => {
    if (state.isConnected && state.pres !== 'P3') {
      handleDisconnection();
      dispatch(clearBids());
      dispatch(clearAsks());

      const currentPres = state.pres;
      switch (currentPres) {
        case 'P0':
          setState({ ...state, pres: 'P1' });
          break;

        case 'P1':
          setState({ ...state, pres: 'P2' });
          break;

        case 'P2':
          setState({ ...state, pres: 'P3' });
          break;

        default:
          break;
      }

      handleConnection();
    }
  }

  const lessPrecision = () => {
    if (state.isConnected && state.pres !== 'P0') {
      handleDisconnection();
      dispatch(clearBids());
      dispatch(clearAsks());

      const currentPres = this.state.pres;
      switch (currentPres) {
        case 'P3':
          setState({ ...state, pres: 'P2' });
          break;

        case 'P2':
          setState({ ...state, pres: 'P1' });
          break;

        case 'P1':
          setState({ ...state, pres: 'P0' });
          break;

        default:
          break;
      }

      handleConnection();
    }
  }

  const RightComponent = () => {
    return (
      <Row gap={10}>
        <TouchableOpacity onPress={() => morePrecision()} disabled={state.pres === 'P3'}>
          <Ionicons
            name='add-outline'
            size={22}
            color={theme.white}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => lessPrecision()} disabled={state.pres === 'P0'}>
          <Ionicons
            name='remove-outline'
            size={22}
            color={theme.white}
          />
        </TouchableOpacity>
      </Row>
    )
  }

  return (
    <Background
      flex={1}
      light
    >
      <Column gap={10}>
        <Ticker state={state} />
        <Accordian title='ORDER BOOK' rightComponent={<RightComponent />}>
          <OrderDataTable />
        </Accordian>
        <Accordian title='TRADES'>
          <TradesDataTable />
        </Accordian>
      </Column>
      <Row style={styles.btnContainer} gap={20} hcenter>
        <Button onPress={() => handleConnection()} title='CONNECT' disabled={state.isConnected} />
        <Button onPress={() => handleDisconnection()} title='DISCONNECT' disabled={!state.isConnected} />
      </Row>
    </Background>
  )
}

const styles = StyleSheet.create({
  btnContainer: {
    position: 'absolute',
    bottom: 10,
    width: '100%'
  },
});