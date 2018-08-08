import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import {Header} from './src/components/common';
import AlbumList from './src/albums/components/AlbumList';
import FetchExample from './src/components/FetchExample';
import Login from './src/tbits/components/Login'
import ZoomableSvg from './src/components/ZoomableSvg';

import TimerExample from './src/components/TimerExample';
import AuthApp from './src/auth/AuthApp';
import TechStackApp from './src/tech_stack_redux_example/TechStackApp';
import ManagerApp from './src/manager/ManagerApp'


import Svg,{
  Circle,
  Ellipse,
  G,
  LinearGradient,
  RadialGradient,
  Line,
  Path,
  Polygon,
  Polyline,
  Rect,
  Symbol,
 
  Use,
  Defs,
  Stop
} from 'react-native-svg';
import TbitsApp from './src/tbits/TbitsApp';


 const { width, height } = Dimensions.get('window');

export default class App extends React.Component {
  render() {
    //console.log(width);
    return (
      // <View style={styles.container}>
      //   <ZoomableSvg width={width} height={height} />
      //   {/* <TimerExample/> */}
        
      // </View>

        // <View style = {{flex: 1}}>
        //     <ManagerApp/>
        // </View>

        <View style = {{flex: 1}}>
            <TbitsApp/>
        </View>

      
    //  <View style = {{flex: 1}}>
    //     <Header headerText = {'Songs'}/>
    //     <AlbumList/>
    //  </View>

    );
  }
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },

  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
});
