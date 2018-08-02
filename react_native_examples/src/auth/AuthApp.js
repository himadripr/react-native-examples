import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Header} from '../components/common'
import firebase from 'firebase';

export default class AuthApp extends Component{
    render(){
        return(
            <View>
                <Header headerText = {'Authentication'}/>
            </View>
        );
    }
}