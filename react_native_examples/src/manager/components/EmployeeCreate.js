import React, {Component} from 'react';
import {connect} from 'react-redux'
import {View, Text} from 'react-native';
import { Card, CardSection, Input, Button } from '../../components/common';
import { employeeUpdate } from '../actions';


class EmployeeCreate extends Component{
    render(){
        return(
            <Card>
                <CardSection>
                    <Input
                        label="Name"
                        value={this.props.name}
                        onChangeText={(text)=> this.props.employeeUpdate({prop: 'name', value: text})}
                        placeHolder="Jane"/>
                </CardSection>
                <CardSection>
                    <Input
                        label="Phone"
                        value={this.props.phone}
                        onChangeText={(text)=> this.props.employeeUpdate({prop: 'phone', value: text})}
                        placeHolder="+919472898910"/>
                </CardSection>
                <CardSection></CardSection>
                <CardSection>
                    <Button>
                        Save
                    </Button>
                </CardSection>
            </Card>
        )
    }
}

const mapStateToProps = (state) =>{
    const {name, phone, shift} = state
    return {name, phone, shift};
}

export default connect(mapStateToProps, {employeeUpdate})(EmployeeCreate);