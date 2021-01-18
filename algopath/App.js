import React, {useState, PropTypes} from 'react';
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

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import StartCoordinate from './StartCoordinate';
import DestCoordinate from './DestCoordinate';
import Findpath from './Findpath';
import Makedot from './Makedot';

const App: () => React$Node = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  // 자동 수동 설정
  const [visibleStatusBar, setVisibleStatusBar] = useState(false);
  // 각각 출발지, 도착지, 경로 탐색 버튼 누르면 나오는 확인 버튼 관리를 위함.
  const [checkstartcoordvisible, setCheckstartcoordvisible] = useState(false);
  const [checkdestcoordvisible, setCheckdestcoordvisible] = useState(false);
  const [pathcheckbutton, setPathcheckbutton] = useState(false);
  // 출발지, 도착지 좌표값 받아오는 변수
  const [startxy, setStartxy] = useState([-200, -250]);
  const [destxy, setDestxy] = useState([-200, -250]);

  // 출발지와 도착지 좌표를 findpath 모듈에 넘겨주는 변수.
  const [startdest, setStartdest] = useState(!visibleStatusBar ? [[-200, -250], [-200, -250]] : [startxy, destxy]);

  // 좌표설정
  const setStartcoordinate = array => {
    setStartxy(array);
  }
  const setDestcoordinate = array => {
    setDestxy(array);
  }

  // switch 버튼 누르면
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    setVisibleStatusBar(!visibleStatusBar);
  }
  const showToastnotauto = () => {
    ToastAndroid.showWithGravity("경로 설정을 수동으로 바꿔주세요.", ToastAndroid.SHORT, ToastAndroid.CENTER);
  }

  // 출발지 버튼 누르면 동작
  const startbuttonpress = () => {
    // 자동 상태이면
    if (!visibleStatusBar) {
      showToastnotauto();
    }
    else {
      if (checkdestcoordvisible) {
        ToastAndroid.showWithGravity("도착지를 먼저 설정해주세요.", ToastAndroid.SHORT, ToastAndroid.CENTER)
      }
      else if (pathcheckbutton){
        ToastAndroid.showWithGravity("경로 탐색이 진행 중입니다. 확인 버튼을 눌러주세요.", ToastAndroid.SHORT, ToastAndroid.CENTER);
      }
      else { // 좌표 띄우기
        setCheckstartcoordvisible(!checkstartcoordvisible);
      }
    }
  }

  // 출발지 설정 확인 버튼을 누르면 동작
  const startcheckpress = () => {
    setCheckstartcoordvisible(!checkstartcoordvisible);
    ToastAndroid.showWithGravity("출발지가 설정되었습니다.", ToastAndroid.SHORT, ToastAndroid.CENTER);
  }

  const destbuttonpress = () => {
    // 자동 상태이면
    if (!visibleStatusBar) {
      showToastnotauto();
    }
    else {
      if (checkstartcoordvisible) {
        ToastAndroid.showWithGravity("출발지를 먼저 설정해주세요.", ToastAndroid.SHORT, ToastAndroid.CENTER);
      }
      else if (pathcheckbutton){
        ToastAndroid.showWithGravity("경로 탐색이 진행 중입니다. 확인 버튼을 눌러주세요.", ToastAndroid.SHORT, ToastAndroid.CENTER);
      }
      else { // 좌표 띄우기
        setCheckdestcoordvisible(!checkdestcoordvisible);
      }
    }
  }

  const destcheckpress = () => {
    setCheckdestcoordvisible(!checkdestcoordvisible);
    ToastAndroid.showWithGravity("도착지가 설정되었습니다.", ToastAndroid.SHORT, ToastAndroid.CENTER);
  }

  // 경로 탐색 버튼 누르면
  const pathbuttonpress = () => {
    if (checkstartcoordvisible) {
      ToastAndroid.showWithGravity("출발지를 먼저 설정해주세요.", ToastAndroid.SHORT, ToastAndroid.CENTER);
    }
    else if (checkdestcoordvisible) {
      ToastAndroid.showWithGravity("도착지를 먼저 설정해주세요.", ToastAndroid.SHORT, ToastAndroid.CENTER)
    }
    else {
      // 경로 탐색을 진행해야함.
      if (pathcheckbutton) {
        ToastAndroid.showWithGravity("경로 탐색을 종료합니다.", ToastAndroid.SHORT, ToastAndroid.CENTER);
      }
      else {
        ToastAndroid.showWithGravity("경로 탐색을 시작합니다.", ToastAndroid.SHORT, ToastAndroid.CENTER);
      }
      setStartdest(!visibleStatusBar ? [[-200, -250], [-200, -250]] : [startxy, destxy]);
      pathcheckpress();
    }
  }

  // 확인 버튼 누르면 동작하는 함수
  const pathcheckpress = () => {
    // 좌표값 받아오기
    setPathcheckbutton(!pathcheckbutton);
  }


  let props_start = {
    setStartcoordinate: setStartcoordinate,
    startcheckpress: startcheckpress,
    x : startxy
  }
  let props_dest = {
    setDestcoordinate: setDestcoordinate,
    destcheckpress: destcheckpress
  }

  let props_variable = {
    startdest : startdest,
  }

  return (
  <SafeAreaView>

    <View style = {styles.StoreContainer}>
      <TouchableOpacity  style={styles.Storebutton}>
        <Text style={styles.Text}> 대전 홈플러스 ∨ </Text>
      </TouchableOpacity>
    </View>

    <View style = {styles.buttonContainer}>
      <View style={styles.button}>
        <View style={styles.switchcontainer}>
          <Text>경로 설정: {!visibleStatusBar ? '자동' : '수동'} </Text>
          <Switch
            trackColor={{ false: "green", true: "pink" }} // #767577 "#81b0ff"
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
        <Button color="#ff5c5c" onPress={() => startbuttonpress()} title={'출발지'} />
        <Button color="#ff5c5c" onPress={() => destbuttonpress()} title={'도착지'} />
        <Button color="#ff5c5c" onPress={() => pathbuttonpress()} title={'경로 탐색'} />
      </View>
    </View>

    <View style={styles.imagecontainer}>
      <Image
        resizeMode="cover"
        style={{height: 240,width: 400}}
        source={require('./map9.jpg')}/>
      <View style={{position: 'absolute'}}>
        {pathcheckbutton && <Findpath {...props_variable}/> }
      </View>
    </View>

    <View style = {styles.checkContainer}>
      <View style={styles.button}>
        {visibleStatusBar && checkstartcoordvisible && <StartCoordinate {...props_start}/> }
        {visibleStatusBar && checkdestcoordvisible && <DestCoordinate {...props_dest}/> }
        {pathcheckbutton && <Button color="#ff5c5c" onPress = {() => setPathcheckbutton()} title ={'확인'} /> }
      </View>
    </View>

  </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  StoreContainer: {
    padding : 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  Storebutton : {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  TextContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Text: {
    fontSize : 20,
  },
  buttonContainer: {
    padding : 10,
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  checkContainer: {
      padding: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  button: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  imagecontainer: {
    marginTop: 20,
    flex: 1,
    padding: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
      flex: 1,
      padding: 10,
      backgroundColor: 'white',
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderColor: 'blue',
        borderWidth: 1,
      },
  switchcontainer: {
      alignItems: "center",
      justifyContent: "center"
    }
});


export default App;
