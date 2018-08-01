import React, {Component} from 'react';
import {View, Text} from 'react-native';
import axios from 'axios';

const baseUrl = 'https://mytbits.com:6081/falcon-dms/rest/api/'
const loginUrl = 'https://mytbits.com:6081/falcon-dms/rest/api/setup/login'

class Fetch_post_call_example extends Component {
    state = {jsonResult: {}, token: ''};

    componentWillMount(){
        let details = {
            'username': 'himadri.p',
            'password': 'root',
            'clientId': 1
        };
    
        let formBody = [];
        for (let property in details) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        fetch(loginUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
            body: formBody,
         })
         .then((response) => response.json())
         .then((responseJson)=> this.setState({jsonResult: responseJson, token: responseJson.token}))
         .catch((error)=> console.error(error));
    
    }

    render(){
        console.log(this.state);
        return (
            <View>
                <Text>Login Form executed</Text>
            </View>
        );
    }
    
}

export default Fetch_post_call_example