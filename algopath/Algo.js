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

const Algo = (props) => {
  const [data, useData] = useState(props.data);
  const [start, useStart] = useState(props.start);
  const [dest, useDest] = useState(props.dest);
  const [mart_x, setMart_x] = useState(props.mart_x);
  const [mart_y, setMart_y] = useState(props.mart_y);

  console.log("algo module start");
  const distance = (params) => {
    return (params[0] - params[2]) * (params[0] - params[2]) + (params[1] - params[3]) * (params[1] - params[3])
  }
  // 데이터 하나가 어느 영역에 속하는지 결정해준다.
  // item의 형식은 [x, y]
  const set_quad = (item) => {
    if (item[1] >= (mart_x * item[0] / mart_y)) {
      if (item[1] >= (-1 * mart_y * item[0] / mart_x + mart_y)) {
        return 1;
      }
      else {
        return 4;
      }
    }
    else {
      if (item[1] >= (-1 * mart_y * item[0] / mart_x + mart_y)) {
        return 2;
      }
      else {
        return 3;
      }
    }
  }
  // 데이터들을 영역 4개로 쪼개줌
  // items는 이중 array 형식의 data이어야 한다.
  const set_data = (items) => {
    console.log("set data");
    var item_list = [...items];
    console.log("item list:")
    var top = [];
    var right = [];
    var bottom = [];
    var left = [];
    for (let i = 0; i < item_list.length; i++) {
      console.log(i);
      switch (set_quad(item_list[i])) {
        case 1:
          console.log('in 1');
          top.push(item_list[i]);
          console.log(top);
          break
        case 2:
          console.log('in 2');
          right.push(item_list[i]);
          console.log(right)
          break
        case 3:
          console.log('in 3');
          bottom.push(item_list[i]);
          console.log(bottom)
          break
        case 4:
          console.log('in 4');
          left.push(item_list[i]);
          console.log(left)
          break
      }
    }
    console.log(right);
    return [[...top], [...right], [...bottom], [...left]]
  }
  // 절댓값을 만들어주는 함수
  const myabs = (num) => {
    if (num >= 0) {
      return num;
    }
    else {
      return -num;
    }
  }

  // fromto 는 [시작영역, 마지막영역]
  // 방문해야하는 영역의 순서를 정해준다.
  const make_area_path = (fromto) => {
    const [area, setArea] = useState([1, 2, 3, 4]);
    const [think_area, setThink_area] = useState([1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4]);
    const [think_s, setThink_s] = useState(area.indexOf(fromto[0]) + 4);
    const [think_d, setThink_d] = useState(area.indexOf(fromto[1]) + 4);
    var result = [];
    if (think_s === think_d) {
      for (let i = 0; i < 5; i++) {
        result.push(think_area[think_s + i]);
      }
    }
    else {
      if (think_area[think_s + 1] === think_area[think_d]) {
        for (let i = 0; i < 4; i++) {
          result.push(think_area[think_s - i]);
        }
      }
      else if (think_area[think_s - 1] === think_area[think_d]) {
        for (let i = 0; i < 4; i++) {
          result.push(think_area[think_s + i]);
        }
      }
      else if (myabs(think_s - think_d) === 2) {
        result.push(think_area[think_s]);
        result.push(think_area[think_s + 1]);
        result.push(think_area[think_s - 1]);
        result.push(think_area[think_d]);
      }
      else {
        console.log("Error");
      }
    }
    return result;
  }

  const get_nearest = (temp_props) => {
    var x = temp_props.temp_start[0];
    var y = temp_props.temp_start[1];
    var smallest = distance([x, y, temp_props.workingarea[0][0], temp_props.workingarea[0][1]]);
    var temp = 0;
    var smallest_item = temp_props.workingarea[0];
    var working_area = temp_props.workingarea;
    for (let i = 0; i < working_area; i++){
      temp = distance([x, y, working_area[i][0], working_area[i][1]]);
      if (temp < smallest) {
        smallest = temp;
        smallest_item = working_area[i];
      }
    }
    return smallest_item;
  }
  const algo = () => {
    var dataset = set_data(props.data);
    var pos_start = set_quad(start);
    var pos_dest = set_quad(dest);
    var area_path = make_area_path([pos_start, pos_dest]);
    // return 할 order
    var order = [start];
    var workingarea = [];

    var index = 0;
    let temp_props;
    var temp_start = 0;
    var temp_dest = 0;

    for (let i = 0; i < 4; i++) {
      workingarea = dataset[area_path.shift() - 1];
      for (let j = 0; j < workingarea.length; j++) {
        temp_start = order[index];
        temp_props = {
          temp_start : temp_start,
          workingarea : workingarea
        }
        temp_dest = get_nearest(temp_props);
        order.push(temp_dest);
        workingarea = workingarea.filter(value => value !== temp_dest);
        index++;
      }
    }
    order.push(props.dest);
    return order;
  }
  return algo();
}

export default Algo;