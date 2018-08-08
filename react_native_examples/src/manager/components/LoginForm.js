import React, {Component} from 'react'
import {Card, CardSection, Input, Button} from '../../components/common'
import {connect} from 'react-redux';
import {emailChanged, passwordChanged} from '../actions'
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
                <CardSection>
                    <Button>
                        Login
                    </Button>
                </CardSection>
                </Card>
        )

    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        email: state.auth.email,
        password: state.auth.password
    };
};

export default connect(mapStateToProps, {emailChanged, passwordChanged})(LoginForm);

// export default connect(mapStateToProps, actions)(LoginForm);