import React, {Component} from 'react';
import {connect} from 'react-redux'
import {View, Text, Picker} from 'react-native';
import { Card, CardSection, Input, Button } from '../../components/common';
import { employeeUpdate, employeeUpdateName, employeeUpdatePhone, employeeUpdateShift } from '../actions';


class EmployeeCreate extends Component{
    render(){
        return(
            
            <Card>
                <CardSection>
                    <Input
                        label="Name"
                        value={this.props.name}
                        onChangeText={(text)=> this.props.employeeUpdateName(text)}
                        placeHolder="Jane"/>
                </CardSection>
                <CardSection>
                    <Input
                        label="Phone"
                        value={this.props.phone}
                        onChangeText={(text)=> this.props.employeeUpdatePhone(text)}
                        placeHolder="+919472898910"/>
                </CardSection>
                <CardSection>
                        <Text style={{fontSize: 18, paddingLeft: 20}}>Shift</Text>
                        <Picker
                            style={{flex: 1}}
                            selectedValue={this.props.shift}
                            onValueChange={day => this.props.employeeUpdateShift(day)}
                            >
                            <Picker.Item label="Monday" value="Monday"/>
                            <Picker.Item label="Tuesday" value="Tuesday"/>
                            <Picker.Item label="Wednesday" value="Wednesday"/>
                            <Picker.Item label="Thursday" value="Thursday"/>
                            <Picker.Item label="Friday" value="Friday"/>
                            <Picker.Item label="Saturday" value="Saturday"/>
                            <Picker.Item label="Sunday" value="Sunday"/>
                        </Picker>
                   
                </CardSection>
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
    const {name, phone, shift} = state.employeeForm
    return {name, phone, shift};
}

export default connect(mapStateToProps, {employeeUpdate, employeeUpdateName, employeeUpdatePhone, employeeUpdateShift})(EmployeeCreate);