import React, {Component} from 'react'
import {View, Dimensions, StyleSheet, Text, Animated} from 'react-native'
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import Login from './components/Login'
import TbitsZoomableSvg from './components/TbitsZoomableSvg';
import reducers from './reducers'
import { Header, Card, CardSection } from '../components/common';
import StatusColourDisplay from './components/StatusColourDisplay';


const { width, height } = Dimensions.get('window');

class TbitsApp extends Component{
    render(){
        return(
            <Provider store = {createStore(reducers)}>
                <View style={styles.container}>
                    <Header headerText = 'Property Id = 1'/>
                    <TbitsZoomableSvg width = {width-210} height={height-10}/>
                    
                    
                </View>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      
      flexDirection: 'column',
      backgroundColor: '#ecf0f1',
    },
  });

export default TbitsApp;