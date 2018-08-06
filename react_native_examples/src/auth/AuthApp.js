import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Header, Button, Spinner} from '../components/common'
import firebase from 'firebase';
import LoginForm from './components/LoginForm'


export default class AuthApp extends Component{
    state = {loggedIn: null}

    componentWillMount(){
        firebase.initializeApp(
            {
                apiKey: "AIzaSyC4RluwXVS5dWElSGQkBR-G33hEA-N444o",
                authDomain: "authentication-e4663.firebaseapp.com",
                databaseURL: "https://authentication-e4663.firebaseio.com",
                projectId: "authentication-e4663",
                storageBucket: "authentication-e4663.appspot.com",
                messagingSenderId: "243156958888"
              }
        );
        firebase.auth().onAuthStateChanged((user)=> {
            if (user) {
                this.setState({loggedIn: true})
            } else {
                this.setState({loggedIn: false})
            }
        });
    }

    renderContent(){

       switch(this.state.loggedIn){
           case true:
                return(
                    <View style ={{justifyContent:'center', alignItems: 'center', flex: 1} }>
                        <Button onPress={()=> firebase.auth().signOut()}>
                            Log Out
                        </Button>
                    </View>
                )
           case false:
                return <LoginForm/>
           default:
                
                return(
                    <View style ={{justifyContent:'center', alignItems: 'center', flex: 1} }>
                        <Spinner size={'large'}/>
                    </View>
                )
       } 
       
    }

    render(){
        return(
            <View>
                <Header headerText = {'Authentication'}/>
                {this.renderContent()}
            </View>
        );
    }
}