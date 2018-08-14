import React, {Component} from 'react';
import {View} from 'react-native';
import {Button, Header} from './common'

export default class TimerExample extends Component {
    constructor() {
        super()
        // Good Solution: Bind it in here!
        this.tick = this.tick.bind(this) 

      }

    state = {
      timer: null,
      counter: 0
    };
  
    componentDidMount() {
      let timer = setInterval(this.tick, 5000);
      console.log('component mounted')
      this.setState({timer});
    }
  
    componentWillUnmount() {
        clearInterval(this.state.timer);
    }
  
    tick() {
        console.log('5 seconds are gone')
        clearInterval(this.state.timer);
        
    }
  
    render() {
      return(
        <View style={{flex: 1}}>
          <Header headerText = 'Timer Example'/>
          <Button>
            Move to next screen
          </Button>
        </View>
      );
    }
  }