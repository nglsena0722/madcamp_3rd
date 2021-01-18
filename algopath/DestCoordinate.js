import React, {useRef} from "react";
import { Animated, View, StyleSheet, PanResponder, Text, Button } from "react-native";
import {useState} from 'react';

const DestCoordinate = (props_dest) => {
  const setxy = () => {
    {props_dest.setDestcoordinate([pan.x._value, pan.y._value])}
    {props_dest.destcheckpress()};
  }

  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value
        });
      },
      onPanResponderMove: Animated.event(
        [
          null,
          { dx: pan.x, dy: pan.y }
        ],
        {useNativeDriver : false}
      ),
      onPanResponderRelease: () => {
        pan.flattenOffset();
      }
    })
  ).current;

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          transform: [{ translateX: pan.x }, { translateY: pan.y }]
        }}
        {...panResponder.panHandlers}
      >
        <View style={styles.box} />
      </Animated.View>
      <Text style={styles.titleText}> 빨간 점을 도착지에 위치시키세요.</Text>
      <Button onPress={() => setxy()} title={'도착지 설정 확인'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  titleText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: "bold"
  },
  box: {
    height: 15,
    width: 15,
    backgroundColor: "red",
    borderRadius: 5
  }
});

export default DestCoordinate;