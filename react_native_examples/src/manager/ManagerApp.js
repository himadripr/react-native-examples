import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {View , Text} from 'react-native';
import ReduxThunk from 'redux-thunk';

import {createStore, applyMiddleware} from 'redux';
import reducers from './reducers'
import firebase from 'firebase'
import LoginForm from './components/LoginForm';



class ManagerApp extends Component{
    componentWillMount(){
        const config = {
            apiKey: "AIzaSyBckOLs0mVIpHvYVNVrE2O7YzVZKjg3vgU",
            authDomain: "manager-f89a7.firebaseapp.com",
            databaseURL: "https://manager-f89a7.firebaseio.com",
            projectId: "manager-f89a7",
            storageBucket: "manager-f89a7.appspot.com",
            messagingSenderId: "954098092396"
          };
          firebase.initializeApp(config)
    }

    render(){
        return (
            <Provider store = {
                createStore(reducers,
                {}, 
                applyMiddleware(ReduxThunk))}>
                <LoginForm/>
            </Provider>
        );
    }
}

export default ManagerApp;