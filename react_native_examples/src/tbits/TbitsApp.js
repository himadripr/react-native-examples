import React, {Component} from 'react'
import {View, Dimensions, StyleSheet} from 'react-native'
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import Login from './components/Login'
import TbitsZoomableSvg from './components/TbitsZoomableSvg';
import reducers from './reducers'

const { width, height } = Dimensions.get('window');

class TbitsApp extends Component{
    render(){
        return(
            <Provider store = {createStore(reducers)}>
                <View style={styles.container}>
                    <TbitsZoomableSvg width = {width} height={height}/>
                </View>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ecf0f1',
    },
  });

export default TbitsApp;