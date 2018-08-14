import React from 'react';
import {Scene, Router} from 'react-native-router-flux';
import ManagerApp from './src/manager/ManagerApp'
import TimerExample from './src/components/TimerExample';

const RouterComponent = () => {
    return (
        <Router>
            <Scene key="timerStartScene" component={TimerExample} title="Timer Example"/>
        </Router>
    );
};

export default RouterComponent