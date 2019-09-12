import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Router, Scene, Actions } from 'react-native-router-flux';
import {Header, Button} from './src/components/common';
import AlbumList from './src/albums/components/AlbumList';
import FetchExample from './src/components/FetchExample';
import Login from './src/tbits/components/Login'
import ZoomableSvg from './src/components/ZoomableSvg';

import TimerExample from './src/components/TimerExample';
import AuthApp from './src/auth/AuthApp';
import TechStackApp from './src/tech_stack_redux_example/TechStackApp';
import ManagerApp from './src/manager/ManagerApp'
import EmployeeList from './src/manager/components/EmployeeList'
import RouterComponent from './src/manager/RouterManager'

import {Provider} from 'react-redux';

import ReduxThunk from 'redux-thunk';

import {createStore, applyMiddleware} from 'redux';
import reducers from './src/manager/reducers'

// "react": "16.3.1",
    // "react-native": "~0.55.2",
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
import EmployeeCreate from './src/manager/components/EmployeeCreate';
 

 const { width, height } = Dimensions.get('window');

export default class App extends React.Component {
  render() {
    //console.log(width);
    return (
      // <View style={styles.container}>
      //   <ZoomableSvg width={width} height={height} />
      //   {/* <TimerExample/> */}
        
      // </View>

        <View style = {{flex: 1}}>
            <Login/>
        </View>

        // <Provider store = {
        //   createStore(reducers,
        //   {}, 
        //   applyMiddleware(ReduxThunk))}>

        //   <Router  sceneStyle = {{paddingTop: 1}}>
        //       <Scene key="root">

                 
        //           <Scene key="managerAppStarting" component={ManagerApp} title="Login"  
        //                />
        //           <Scene 
        //                 key="employeeList" 
        //                 component={EmployeeList} 
        //                 title="Employees"
        //                 initial
        //                 renderBackButton={()=>(<View></View>)}
        //                 renderRightButton = {()=> {
        //                   return(
        //                     <Button onPress = {()=>Actions.employeeCreate()}>
        //                       +
        //                     </Button>
        //                   )
        //                 }}
        //             />
        //           <Scene key="employeeCreate" component = {EmployeeCreate} title="Employee Create Form"/>
        //       </Scene>
     
        //     </Router> 
          
        //   </Provider>

        

 

       

        // <RouterComponent/>

        // <View style = {{flex: 1}}>
        //     <TbitsApp/>
        // </View>

      
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
