import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import theme from 'app/theme';
import Background from '../Background';
import Text from 'app/components/Text';
import Row from 'app/components/Row';

const Accordian = ({ title, children, rightComponent }) => {

  const [open, setOpen] = useState(false);

  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 10,
      paddingVertical: 15
    },
    content: {
      minHeight: open ? '100%' : 0,
      borderTopWidth: open ? 1 : 0,
      borderTopColor: theme.gray,
      overflow: 'hidden'
    }
  });

  const handleOpen = () => {
    setOpen(s => !s);
  }

  return (
    <Background>
      <Row vcenter justifyContent='space-between'>
        <TouchableOpacity style={styles.container} onPress={() => handleOpen()}>
          <Row>
            <Ionicons
              name={open ? 'chevron-down-outline' : 'chevron-forward-outline'}
              size={20}
              color={theme.white}
            />
            <Text bold>{title}</Text>
          </Row>
        </TouchableOpacity>
        <View>
          {rightComponent}
        </View>
      </Row>
      <View style={styles.content}>
        {children}
      </View>
    </Background>
  )
}

export default Accordian;
