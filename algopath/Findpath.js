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
  // 이동 경로 좌표값 Array 받아오는 변수
  const [sampledot, setSampledot] = useState([ [-160,-190], [-170,-230], [-140,-180], [200,0]]);
  const [mart_x, setMart_x] = useState(400);
  const [mart_y, setMart_y] = useState(250);
  const coordtrans = () => {
    var data = [];
    console.log(props_variable.startdest[0]);
    console.log(props_variable.startdest[1]);
    data.push([props_variable.startdest[0][0]+200, props_variable.startdest[0][1]+270]);
    for (let i = 0; i < sampledot.length; i++) {
      data.push([sampledot[i][0]+200, sampledot[i][1]+270]);
    }

    data.push([props_variable.startdest[1][0]+200, props_variable.startdest[1][1]+270]);

    let props= {
      data : data,
      start : props_variable.startdest[0],
      dest : props_variable.startdest[1],
      mart_x : mart_x,
      mart_y : mart_y,
    }
    console.log(data);
    return Algo(props);
  }

  const [transdot, setTransdot] = useState(coordtrans());
  // transdot에 알고리즘을 적용해서 applydot에 넘긴다.
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