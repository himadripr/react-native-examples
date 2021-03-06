import React, { Component } from 'react';
import {  View, StyleSheet, PanResponder, Dimensions } from 'react-native';


import Svg,{
    Circle,
    Ellipse,
    G,
    LinearGradient,
    RadialGradient,
    Line,
    Path,
    Polygon,
    Polyline,
    Rect,
    Symbol,
   
    Use,
    Defs,
    Stop
  } from 'react-native-svg';

// Based on https://gist.github.com/evgen3188/db996abf89e2105c35091a3807b7311d

function calcDistance(x1, y1, x2, y2) {
  const dx = x1 - x2;
  const dy = y1 - y2;
  return Math.sqrt(dx * dx + dy * dy);
}

function middle(p1, p2) {
  return (p1 + p2) / 2;
}

function calcCenter(x1, y1, x2, y2) {
  return {
    x: middle(x1, x2),
    y: middle(y1, y2),
  };
}

class ZoomableSvg extends Component {
  constructor() {
    super()
    // Good Solution: Bind it in here!
    this.tick = this.tick.bind(this) 

  }

  state = {
    timer: null,
    isClickable: false,
    zoom: 1,
    left: 0,
    top: 0,
  };

  processPinch(x1, y1, x2, y2) {
    const distance = calcDistance(x1, y1, x2, y2);
    const { x, y } = calcCenter(x1, y1, x2, y2);
    console.log('zooming')
    if (!this.state.isZooming) {
      const { top, left, zoom } = this.state;
      this.setState({
        isZooming: true,
        isClickable: false,
        initialX: x,
        initialY: y,
        initialTop: top,
        initialLeft: left,
        initialZoom: zoom,
        initialDistance: distance,
      });
    } else {
      const {
        initialX,
        initialY,
        initialTop,
        initialLeft,
        initialZoom,
        initialDistance,
      } = this.state;

      const touchZoom = distance / initialDistance;
      const dx = x - initialX;
      const dy = y - initialY;

      const left = (initialLeft + dx - x) * touchZoom + x;
      const top = (initialTop + dy - y) * touchZoom + y;
      const zoom = initialZoom * touchZoom;

      this.setState({
        zoom,
        left,
        top,
      });
    }
  }

  processTouch(x, y) {
    if (!this.state.isMoving || this.state.isZooming) {
        console.log('isMoving')
      const { top, left } = this.state;
      this.setState({
        isMoving: true,
        isZooming: false,
        isClickable: false,
        initialLeft: left,
        initialTop: top,
        initialX: x,
        initialY: y,
      });
    } else {
      const { initialX, initialY, initialLeft, initialTop } = this.state;
      console.log('do not know what is happening')
      const dx = x - initialX;
      const dy = y - initialY;
      this.setState({
        left: initialLeft + dx,
        top: initialTop + dy,
      });
    }
  }

  createPanResponder(){
    this._panResponder = PanResponder.create({
        onPanResponderGrant: () => {},
        onPanResponderTerminate: () => {},
        onMoveShouldSetPanResponder: () => true,
        onStartShouldSetPanResponder: () => true,
        onShouldBlockNativeResponder: () => true,
        onPanResponderTerminationRequest: () => true,
        onMoveShouldSetPanResponderCapture: () => true,
        onStartShouldSetPanResponderCapture: () => true,
        onPanResponderMove: evt => {
          const touches = evt.nativeEvent.touches;
          const length = touches.length;
          console.log(length);
          if (length === 0){
              console.log('click');
          }
          if (length === 1) {
            const [{ locationX, locationY }] = touches;
            this.processTouch(locationX, locationY);
          } else if (length === 2) {
            const [touch1, touch2] = touches;
            this.processPinch(
              touch1.locationX,
              touch1.locationY,
              touch2.locationX,
              touch2.locationY
            );
          }
        },
        onPanResponderRelease: () => {
          console.log('pan responder released.')
          let timer = setInterval(this.tick, 1000);
        
          this.setState({
            timer,
            isZooming: false,
            isMoving: false,
            isClickable: true
          });
  
        },
      });
  }

  tick() {
    
    clearInterval(this.state.timer);
    this.setState({
      isZooming: false,
      isMoving: false,
      isClickable: false
    });
    
  } 

  componentWillMount() {
      this.createPanResponder()
  
  }

  renderSvg(){

     const pathValue = "M608.32 227.4L608.32 226.22 608.73 224.28 609.14 223.54 609.56 222.79 610.71 222.04 611.46 222.04 612.2 222.04 613.31 222.66 613.69 223.29 614.06 223.91 614.43 226.09 614.43 227.64 614.43 228.98 614.04 231.08 613.65 231.85 613.26 232.62 612.12 233.39 611.37 233.39 610.62 233.39 609.48 232.77 609.09 232.15 608.71 231.53 608.32 229.16 608.32 227.4 608.32 227.4Z M609.61 227.54L609.61 229.83 610.45 232.12 611.28 232.12 611.76 232.12 612.46 231.61 612.69 231.1 612.91 230.59 613.14 228.82 613.14 227.55 613.14 226.67 613.05 225.38 612.97 224.97 612.88 224.57 612.6 223.95 612.41 223.73 612.21 223.52 611.72 223.31 611.43 223.31 610.52 223.31 609.61 225.43 609.61 227.54 609.61 227.54Z"  
    
      const pointValueForPolygon = "93.81 107.94 93.45 107.77 93.44 107.83 93.78 107.98 93.81 107.94\
          93.45 107.77 93.05 107.82 93.07 107.87 93.44 107.83 93.45 107.77\
          93.05 107.82 92.73 108.05 92.78 108.09 93.07 107.87 93.05 107.82\
          92.73 108.05 92.78 108.09 92.29 108.70 92.21 108.70 92.73 108.05\
          92.21 108.70 92.29 108.70 94.70 111.74 94.69 111.82 92.21 108.70\
          94.69 111.82 94.70 111.74 96.61 110.22 96.64 110.27 94.69 111.82\
          96.64 110.22 96.17 109.82 96.14 109.87 96.61 110.26 96.64 110.22\
          96.17 109.82 96.14 109.87 93.78 107.98 93.81 107.94 96.17 109.82"
      
    
    const viewBoxSizeString = "0 0 800 800"
    const viewBoxSize = 800;
    const { height, width } = this.props;
    const { left, top, zoom } = this.state;
    const resolution = viewBoxSize / Math.min(height, width);
    if (this.state.isClickable){
        return (
            <View >
                
                <Svg
                    width={width}
                    height={height}
                    viewBox= {viewBoxSizeString}
                    preserveAspectRatio="xMinYMin meet">
        
                    <G
                        transform={{
                        translateX: left * resolution,
                        translateY: top * resolution,
                        scale: zoom,
                        }}
                        
                        >
                        
                        <Polygon
                            points= {pointValueForPolygon}
                            fill="lime"
                            stroke="purple"
                            strokeWidth="1"
                            onPress={() => console.log("press on ploygon")} />
            
                        
                        {/* <Path
                        //d="M55.192 27.87l-5.825-1.092a17.98 17.98 0 0 0-1.392-3.37l3.37-4.928c.312-.456.248-1.142-.143-1.532l-4.155-4.156c-.39-.39-1.076-.454-1.532-.143l-4.928 3.37a18.023 18.023 0 0 0-3.473-1.42l-1.086-5.793c-.103-.543-.632-.983-1.185-.983h-5.877c-.553 0-1.082.44-1.185.983l-1.096 5.85a17.96 17.96 0 0 0-3.334 1.393l-4.866-3.33c-.456-.31-1.142-.247-1.532.144l-4.156 4.156c-.39.39-.454 1.076-.143 1.532l3.35 4.896a18.055 18.055 0 0 0-1.37 3.33L8.807 27.87c-.542.103-.982.632-.982 1.185v5.877c0 .553.44 1.082.982 1.185l5.82 1.09a18.013 18.013 0 0 0 1.4 3.4l-3.31 4.842c-.313.455-.25 1.14.142 1.53l4.155 4.157c.39.39 1.076.454 1.532.143l4.84-3.313c1.04.563 2.146 1.02 3.3 1.375l1.096 5.852c.103.542.632.982 1.185.982h5.877c.553 0 1.082-.44 1.185-.982l1.086-5.796c1.2-.354 2.354-.82 3.438-1.4l4.902 3.353c.456.313 1.142.25 1.532-.142l4.155-4.154c.39-.39.454-1.076.143-1.532l-3.335-4.874a18.016 18.016 0 0 0 1.424-3.44l5.82-1.09c.54-.104.98-.633.98-1.186v-5.877c0-.553-.44-1.082-.982-1.185zM32 42.085c-5.568 0-10.083-4.515-10.083-10.086 0-5.568 4.515-10.084 10.083-10.084 5.57 0 10.086 4.516 10.086 10.083 0 5.57-4.517 10.085-10.086 10.085z"
                            d= {pathValue}
                                //d="M25 10 L98 65 L70 25 L16 77 L11 30 L0 4 L90 50 L50 10 L11 22 L77 95 L20 25"
                            fill="none"
                            stroke="red"
                            strokeWidth = "5"
                            //working  but when panresponder is not mentioned.
                            onPress = {()=> console.log("press on path")}
                    
                            //fill="blue"
                        /> */}
                    </G>
                </Svg>
          </View>
        );
    }  else {
        return (
            <View {...this._panResponder.panHandlers}>
                
                <Svg
                    width={width}
                    height={height}
                    viewBox={viewBoxSizeString}
                    preserveAspectRatio="xMinYMin meet">
        
                    <G
                        transform={{
                        translateX: left * resolution,
                        translateY: top * resolution,
                        scale: zoom,
                        }}
                        
                        >
                        
                        <Polygon
                            points={pointValueForPolygon}
                            fill="lime"
                            stroke="purple"
                            strokeWidth="1"
                            onPress={() => console.log("press on ploygon")} />
            
                        
                        {/* <Path
                        //d="M55.192 27.87l-5.825-1.092a17.98 17.98 0 0 0-1.392-3.37l3.37-4.928c.312-.456.248-1.142-.143-1.532l-4.155-4.156c-.39-.39-1.076-.454-1.532-.143l-4.928 3.37a18.023 18.023 0 0 0-3.473-1.42l-1.086-5.793c-.103-.543-.632-.983-1.185-.983h-5.877c-.553 0-1.082.44-1.185.983l-1.096 5.85a17.96 17.96 0 0 0-3.334 1.393l-4.866-3.33c-.456-.31-1.142-.247-1.532.144l-4.156 4.156c-.39.39-.454 1.076-.143 1.532l3.35 4.896a18.055 18.055 0 0 0-1.37 3.33L8.807 27.87c-.542.103-.982.632-.982 1.185v5.877c0 .553.44 1.082.982 1.185l5.82 1.09a18.013 18.013 0 0 0 1.4 3.4l-3.31 4.842c-.313.455-.25 1.14.142 1.53l4.155 4.157c.39.39 1.076.454 1.532.143l4.84-3.313c1.04.563 2.146 1.02 3.3 1.375l1.096 5.852c.103.542.632.982 1.185.982h5.877c.553 0 1.082-.44 1.185-.982l1.086-5.796c1.2-.354 2.354-.82 3.438-1.4l4.902 3.353c.456.313 1.142.25 1.532-.142l4.155-4.154c.39-.39.454-1.076.143-1.532l-3.335-4.874a18.016 18.016 0 0 0 1.424-3.44l5.82-1.09c.54-.104.98-.633.98-1.186v-5.877c0-.553-.44-1.082-.982-1.185zM32 42.085c-5.568 0-10.083-4.515-10.083-10.086 0-5.568 4.515-10.084 10.083-10.084 5.57 0 10.086 4.516 10.086 10.083 0 5.57-4.517 10.085-10.086 10.085z"
                            // d="M608.32 227.4L608.32 226.22 608.73 224.28 609.14 223.54 609.56 222.79 610.71 222.04 611.46 222.04 612.2 222.04 613.31 222.66 613.69 223.29 614.06 223.91 614.43 226.09 614.43 227.64 614.43 228.98 614.04 231.08 613.65 231.85 613.26 232.62 612.12 233.39 611.37 233.39 610.62 233.39 609.48 232.77 609.09 232.15 608.71 231.53 608.32 229.16 608.32 227.4 608.32 227.4Z M609.61 227.54L609.61 229.83 610.45 232.12 611.28 232.12 611.76 232.12 612.46 231.61 612.69 231.1 612.91 230.59 613.14 228.82 613.14 227.55 613.14 226.67 613.05 225.38 612.97 224.97 612.88 224.57 612.6 223.95 612.41 223.73 612.21 223.52 611.72 223.31 611.43 223.31 610.52 223.31 609.61 225.43 609.61 227.54 609.61 227.54Z"  
                                //d="M25 10 L98 65 L70 25 L16 77 L11 30 L0 4 L90 50 L50 10 L11 22 L77 95 L20 25"
                            d= {pathValue}
                            fill="none"
                            stroke="red"
                            strokeWidth = "5"
                            //working  but when panresponder is not mentioned.
                            onPress = {()=> console.log("press on path")}
                    
                            //fill="blue"
                        /> */}
                    </G>
                </Svg>
          </View>
        );
    }
    
      
  }
  

  render (){

      return(
            <View>
                {this.renderSvg()}
            </View>
      );
  }
}



// export default class App extends Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <ZoomableSvg width={width} height={height} />
//       </View>
//     );
//   }
// }

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ecf0f1',
  },
});

export default ZoomableSvg;
