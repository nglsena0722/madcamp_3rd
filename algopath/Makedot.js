import Svg, {
  Circle,
  Text,
  Polyline,
} from 'react-native-svg';
import React, {useState, PropTypes} from 'react';
import { View, StyleSheet, Button } from 'react-native';

const Makedot = (props_transdot) => {
  return (
  <View>
    <View>
      <Svg width={props_transdot.mart_x} height={props_transdot.mart_y} >
        {props_transdot.transdot.map(dot => <Circle cx={dot[0]} cy={dot[1]} r="5" fill="pink" /> )}
        <Polyline
          points= {props_transdot.transdot.toString()}
          fill="none"
          stroke="red"
          strokeWidth="3"
        />
      </Svg>
    </View>
  </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderBottomColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    flex: 5,
    fontWeight: '500',
    fontSize: 18,
    marginVertical: 20,
    width: 100,
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderColor: 'blue',
    borderWidth: 2,
    marginRight: 20,
    marginLeft: 20,
  },
});

export default Makedot;