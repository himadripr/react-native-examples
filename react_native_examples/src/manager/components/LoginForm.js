import React, {Component} from 'react'
import {Text} from 'react-native'
import {Card, CardSection, Input, Button, Spinner} from '../../components/common'
import {connect} from 'react-redux';
import {emailChanged, passwordChanged, loginUser} from '../actions'
//import * as actions from '../actions'

class LoginForm extends Component{
    onEmailChange(text){
        this.props.emailChanged(text);
    }

    onPasswordChange(text){
        this.props.passwordChanged(text);
    }

    render(){
        return(
            <Card>
                <CardSection>
                    <Input
                        label ="Email"
                        placeHolder = "email@gmail.com"
                        onChangeText = {this.onEmailChange.bind(this)}
                        value = {this.props.email}
                    />
                </CardSection>
                <CardSection>
                    <Input
                        secureTextEntry
                        label = "Password"
                        placeHolder = "password"
                        onChangeText = {this.onPasswordChange.bind(this)}
                        value = {this.props.password}
                    />
                </CardSection>
                <Text style = {{fontSize: 18, color: 'red', alignSelf: 'center'}}>{this.props.error}</Text>
                <CardSection>
                    {this.renderButton()}
                </CardSection>
                </Card>
        )

    }

    renderButton(){
        if (this.props.loading){
            return <Spinner size='large'/>
        } else {
            return (
                <Button onPress = {this.onButtonPress.bind(this)}>
                    Login
                </Button>
            )
        }
    }

    onButtonPress(){
        const {email, password} = this.props
        this.props.loginUser({email, password})
    }
}

// const mapStateToProps = (state, ownProps) => {
//     return {
//         email: state.auth.email,
//         password: state.auth.password,
//         error: state.auth.error
//     };
// };

// or 

const mapStateToProps = ({auth}) => {
    const {email, password, error, loading} = auth;
    return {
        email,
        password,
        error,
        loading
    };
};

export default connect(mapStateToProps, {emailChanged, passwordChanged, loginUser})(LoginForm);

// export default connect(mapStateToProps, actions)(LoginForm);