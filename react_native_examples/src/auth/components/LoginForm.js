import React, {Component} from 'react';
import { Text} from 'react-native';
import firebase from 'firebase'
import {Card, CardSection, Button, Input, Spinner} from '../../components/common';

class LoginForm extends Component{
    state = {
        email: '',
        password: '',
        error: '',
        loading: false
    }

    renderButton(){
        if (this.state.loading){
            return <Spinner size="small"/>
        } else {
            return (
                <Button onPress = {this.onButtonPress.bind(this)}>
                    Log in
                </Button>
            )
        }
    }

    onButtonPress(){
        const {email, password} = this.state
        this.setState({loading:true, error: ''})
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(this.onLoginSuccess.bind(this))
            .catch(() => {
                firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(email, password)
                    .then(this.onLoginSuccess.bind(this))    
                    .catch(this.onLoginFail.bind(this))    
                    

                    
                    
            })
    }

    onLoginSuccess(){
        console.log('login successful')
        this.setState({
            email: '',
            password: '',
            error: '',
            loading: false
        })
    }

    onLoginFail(){
        console.log('login failed')
        this.setState({error: 'Authentication failed', loading:false})
    }

    render(){
        return(
            <Card>
                <CardSection>
                    <Input 
                        placeHolder = "user@gmail.com"
                        label = {'Email'}
                        value = {this.state.email}
                        onChangeText = {value => this.setState({email: value})}

                        //no secureTextEntry so undefined in JSX means false
                        
                    />
                </CardSection>
                <CardSection>
                <Input 
                        placeHolder = "password"
                        secureTextEntry //it is a boolean value so by mentioning it we mean it is true
                        label = {'Password'}
                        value = {this.state.password}
                        onChangeText = {value => this.setState({password: value})}
                        
                    />
                </CardSection>

                <Text style = {styles.errorTextStyle}> 
                    {this.state.error}
                </Text>

                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
        );
    }
}

const styles = {
    errorTextStyle: {
        color: 'red',
        alignSelf: 'center',
        fontSize: 20
    }
}

export default LoginForm;