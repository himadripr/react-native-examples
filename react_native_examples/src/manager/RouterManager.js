import React from 'react';
import {Scene, Router} from 'react-native-router-flux';
import ManagerApp from './ManagerApp'
import EmployeeList from './components/EmployeeList'
import Button from '../components/common'
import { View } from 'native-base';


const RouterComponent = () => {
    return (
       
        <Router  sceneStyle = {{paddingTop: 1}}>
            <Scene key="root">
            
                <Scene key="managerAppStarting" component={ManagerApp} title="Login"  />
            
                <Scene 
                    key="employeeList" 
                    component={EmployeeList} 
                    title="Employees"
                    renderRightButton = {()=> {
                    return(
                        <Button onPress = {()=>alert('on Right')}>
                        Add
                        </Button>
                    )
                    }}
                    renderBackButton = {()=> <View></View>}
                    
                    initial
                    />

                </Scene>

        </Router> 
    );
};

export default RouterComponent;