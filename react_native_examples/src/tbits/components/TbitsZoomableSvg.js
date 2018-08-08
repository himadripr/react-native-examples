import React, { Component } from 'react';
import {  View, StyleSheet, PanResponder, Dimensions } from 'react-native';
import {connect} from 'react-redux';

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

class TbitsZoomableSvg extends Component {
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

  renderPolygons(){
    return (
        this.props.svgData.plotData.map(plot => 
            <Polygon
                points= {plot.polygon}
                fill={plot.colour}
                stroke="purple"
                strokeWidth="1"
                onPress={() => console.log(plot.plotId)} />)
    )
  }

  renderSvg(){

     const pathValue = "M608.32 227.4L608.32 226.22 608.73 224.28 609.14 223.54 609.56 222.79 610.71 222.04 611.46 222.04 612.2 222.04 613.31 222.66 613.69 223.29 614.06 223.91 614.43 226.09 614.43 227.64 614.43 228.98 614.04 231.08 613.65 231.85 613.26 232.62 612.12 233.39 611.37 233.39 610.62 233.39 609.48 232.77 609.09 232.15 608.71 231.53 608.32 229.16 608.32 227.4 608.32 227.4Z M609.61 227.54L609.61 229.83 610.45 232.12 611.28 232.12 611.76 232.12 612.46 231.61 612.69 231.1 612.91 230.59 613.14 228.82 613.14 227.55 613.14 226.67 613.05 225.38 612.97 224.97 612.88 224.57 612.6 223.95 612.41 223.73 612.21 223.52 611.72 223.31 611.43 223.31 610.52 223.31 609.61 225.43 609.61 227.54 609.61 227.54Z"  
      
      const pointValueForPolygon = "100 100 200 200 150 500"
      const pointValueForPolygon1 = "400 100 200 200 150 700"
      const pointValueForPolygon2 = "150 10 20 600 2 500"
      
    
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
                        {this.renderPolygons()}
            
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
                        {this.renderPolygons()}
            
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

const mapStateToProps = state => {
    return{
        svgData : state.svgData
    }
}

export default connect(mapStateToProps)(TbitsZoomableSvg);
