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
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [smallest, setSmallest] = useState(0);
  const [smallest_item, setSmallest_item] = useState(props.workingarea[0]);

  // params는 start 좌표, dest 좌표로 이루어져있음.
  const distance = (params) => {
    return (params[0] - params[2]) * (params[0] - params[2]) + (params[1] - params[3]) * (params[1] - params[3])
  }

  // 데이터 하나가 어느 영역에 속하는지 결정해준다.
  // item의 형식은 [x, y]
  const set_quad = (item) => {
    if (item[1] >= (props.mart_x * item[0] / props.mart_y)) {
      if (item[1] >= (-1 * props.mart_y * item[0] / props.mart_x + props.mart_y)) {
        return 1;
      }
      else {
        return 4;
      }
    }
    else {
      if (item[1] >= (-1 * props.mart_y * item[0] / props.mart_x + props.mart_y)) {
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
    const [top, setTop] = useState([]);
    const [right, setRight] = useState([]);
    const [bottom, setBottom] = useState([]);
    const [left, setLeft] = useState([]);
    items.map(item => {
        if (set_quad(item) === 1) {
          setTop([...top, item]);
        }
        else if (set_quad(item) === 2) {
          setRight([...right, item]);
        }
        else if (set_quad(item) === 3) {
          setBottom([...bottom, item]);
        }
        else {
          setLeft([...left, item]);
        }
      }
    )
    return [top, right, bottom, left]
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

  const get_nearest = (props) => {
    setX(props.temp_start[0]);
    setY(props.temp_start[1]);
    setSmallest(distance([x, y, props.workingarea[0][0], props.workingarea[0][1]]));



  }

  const algo = () => {
    const [dataset, setDataset] = useState(set_data(props.data));
    const [startnum, setStartnum] = useState(set_quad(props.start));
    const [destnum, setDestnum] = useState(set_quad(props.dest));
    const [area_path, setArea_path] = useState(make_area_path([startnum, destnum]));
    const [temparray, setTemparray] = useState([]);
    const [temp_start, setTemp_start] = useState(0);
    // return 할 order
    const [order, setOrder] = useState([props.start]);
    const [workingarea, setWorkingarea] = useState([]);
    let props;
    var index = 0;
    for (let i = 0; i < 4; i++) {
      setWorkingarea(dataset[area_path.shift() - 1]);
      for (let j = 0; j < workingarea.length; j++) {
        setTemp_start(order[index]);
        props = {
          temp_start : temp_start,
          workingarea : workingarea
        }

      }
    }
    order.push(props.dest);
    return order;
  }

  return props.data;
}

export default Algo;