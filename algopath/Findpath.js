import React, {useRef, useState} from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Switch,
  StatusBar,
  Button,
  Image,
  TouchableOpacity,
  ToastAndroid,
  PanResponder,
} from 'react-native';
import Makedot from './Makedot';
import Algo from './Algo';

const Findpath = (props_variable) => {
  // 파이어베이스에서 이동 경로 좌표값 Array 받아오기
  const [sampledot, setSampledot] = useState([ [-150,-200], [-100,-150], [-140,-180], [-50,-100]]);

  const [mart_x, setMart_x] = useState(400);
  const [mart_y, setMart_y] = useState(250);
  const coordtrans = () => {
    var data = [];
//    data.push([props_variable.startdest[0][0]+200, props_variable.startdest[0][1]+270]);
    for (let i = 0; i < sampledot.length; i++) {
      data.push([sampledot[i][0]+200, sampledot[i][1]+270]);
    }

//    data.push([props_variable.startdest[1][0]+200, props_variable.startdest[1][1]+270]);

    let props= {
      data : data,
      start : [props_variable.startdest[0][0]+200, props_variable.startdest[0][1]+270],
      dest : [props_variable.startdest[1][0]+200, props_variable.startdest[1][1]+270],
      mart_x : mart_x,
      mart_y : mart_y,
    }
    console.log(data);
    // 알고리즘을 적용한 좌표 순서를 넘긴다.
    return Algo(props);
  }

  const [transdot, setTransdot] = useState(coordtrans());
  let props_transdot= {
    transdot : transdot,
    mart_x : mart_x,
    mart_y : mart_y,
  }

  return (
    <Makedot {...props_transdot}/>
  )
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

export default Findpath;