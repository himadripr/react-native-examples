import React, { Component } from 'react';
import {  View, StyleSheet, PanResponder, Dimensions, Text, Image, TouchableOpacity } from 'react-native';
import {Container, Content, StyleProvider} from 'native-base'
import {connect} from 'react-redux';
import {albumDataChanged, svgDataChanged} from '../actions'
import  {Card, CardSection, Spinner, Button} from '../../components/common'
import LIGHT_BLUE_COLOR from '../../constants/Color'
import axios from 'axios'

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
import { statusToColour } from '../MapStatusToColour';

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

const svgDataUrl = 'http://falcon.mytbits.com:80/Project3/rest/meraasService/getSvgData'
var marginOfSpinner;

class TbitsZoomableSvg extends Component {

  

  constructor() {
    super()
    // Good Solution: Bind it in here!
    this.tick = this.tick.bind(this) 

  }

  state = {
    timer: null,
    isClickable: false,
    // isLoading: true,
    isLoading: false,
    rotationAngle: "0",
    originOfRotation : "0, 0",
    plotId: "0",
    status: "none",
    zoom: 1,
    left: 0,
    top: 0,
  };

  processPinch(x1, y1, x2, y2) {
    const distance = calcDistance(x1, y1, x2, y2);
    const { x, y } = calcCenter(x1, y1, x2, y2);
    //console.log('zooming')
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
        //console.log('isMoving')
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
      //console.log('do not know what is happening')
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
          //console.log(length);
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
          //console.log('pan responder released.')
          let timer = setInterval(this.tick, 150);
        
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

  onAlbumsDataChanged(response){
       this.props.albumDataChanged(response.data)
  }

  componentWillMount() {
      this.createPanResponder()
      console.log('component willlll mount')
      
        
        // fetch('http://rallycoding.herokuapp.com/api/music_albums')
        //  .then((response) => response.json())
        //  .then((responseJson)=> this.props.albumDataChanged(responseJson))

        // fetch(svgDataUrl)
        // .then((response) => response.json())
        // .then((responseJson)=> this.displayData(responseJson))
  
  }

  rotateAntiClockwise(direction){
     const { height, width } = this.props;
     const xOriginOfRotation = width/2;
     const yOriginOfRotation = height/2;
     const originOfRotation = ""+`${xOriginOfRotation}` + ", "+`${yOriginOfRotation}`
     var rotationAngle;
     if (direction === '+')
      {rotationAngle = parseInt(this.state.rotationAngle, 10) + 10}
      else 
      {rotationAngle = parseInt(this.state.rotationAngle, 10) - 10}
     const rotationAngleString = ""+`${rotationAngle}`
     this.setState({originOfRotation: originOfRotation, rotationAngle: rotationAngleString})
  }

  displayData(responseJson){
    //console.log('display data function executed')
    this.setState({isLoading: false})
    this.props.svgDataChanged(responseJson)
  }

  renderPlotDetailsTextView(){
    const plotIdString = "Plot Id : " + `${this.state.plotId}`;
    const statusString = "Status : " + `${this.state.status}`
    if (this.state.plotId != "0"){
      return (
        <Card>
          <CardSection>
            <Text style={{fontSize: 18}}>{plotIdString}</Text>
          </CardSection>
          <CardSection>
            <Text style={{fontSize: 18}}>{statusString}</Text>
          </CardSection>
          {this.renderBuyNowButton()}
          
        </Card>
      );
    }
  }

  renderBuyNowButton(){
    if (this.state.status === 'AVAILABLE'){
      return (
        <CardSection>
           
                
           <Button >
                    
                Buy Now
                
            </Button>
               
              
             
           
        </CardSection>
        
      );
    } else {
       return <View></View>
    }
  }

  renderPolygons(){
    // console.log(this.props.svgData)
    // console.log(this.props.svgData.Height)
    // console.log(this.props.svgData.PlotDetails)
    
    return (
        this.props.svgData.PlotDetails.map(plot => 
            <Polygon
                key = {plot.PlotId}
                points= {plot.Polygon}
                fill={statusToColour[plot.Status]}
                // fill='green'
                
                 stroke="black"
                // strokeWidth="1"
                // onPress={() => console.log("plot = " + `${plot.PlotId}`)} />)
                // onPress={() => alert('plot id selected = ' + `${plot.PlotId}`)} />)
                onPress={() => this.setState({plotId: plot.PlotId, status: plot.Status}) }/>)
    )
  }


  renderSvg(){
     
    if (this.props.svgData != null){
     
      const size = parseInt(this.props.svgData.Width, 10)>parseInt(this.props.svgData.Height, 10)?parseInt(this.props.svgData.Width, 10):parseInt(this.props.svgData.Height, 10);
     //const viewBoxSizeString = "0 0 200 200"
     const viewBoxSizeString = "0 0 "+ `${size}` + " " + `${size}`
     const viewBoxSize = size;
     const { height, width, marginTop, marginBottom } = this.props;
     marginOfSpinner = (height/2)-60
     const { left, top, zoom } = this.state;
     const resolution = viewBoxSize / Math.min(height, width)

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
                         rotation = {this.state.rotationAngle}
                         origin = {this.state.originOfRotation}
                         
                         >
                         {this.renderPolygons()}
                         <Path
                         //d="M55.192 27.87l-5.825-1.092a17.98 17.98 0 0 0-1.392-3.37l3.37-4.928c.312-.456.248-1.142-.143-1.532l-4.155-4.156c-.39-.39-1.076-.454-1.532-.143l-4.928 3.37a18.023 18.023 0 0 0-3.473-1.42l-1.086-5.793c-.103-.543-.632-.983-1.185-.983h-5.877c-.553 0-1.082.44-1.185.983l-1.096 5.85a17.96 17.96 0 0 0-3.334 1.393l-4.866-3.33c-.456-.31-1.142-.247-1.532.144l-4.156 4.156c-.39.39-.454 1.076-.143 1.532l3.35 4.896a18.055 18.055 0 0 0-1.37 3.33L8.807 27.87c-.542.103-.982.632-.982 1.185v5.877c0 .553.44 1.082.982 1.185l5.82 1.09a18.013 18.013 0 0 0 1.4 3.4l-3.31 4.842c-.313.455-.25 1.14.142 1.53l4.155 4.157c.39.39 1.076.454 1.532.143l4.84-3.313c1.04.563 2.146 1.02 3.3 1.375l1.096 5.852c.103.542.632.982 1.185.982h5.877c.553 0 1.082-.44 1.185-.982l1.086-5.796c1.2-.354 2.354-.82 3.438-1.4l4.902 3.353c.456.313 1.142.25 1.532-.142l4.155-4.154c.39-.39.454-1.076.143-1.532l-3.335-4.874a18.016 18.016 0 0 0 1.424-3.44l5.82-1.09c.54-.104.98-.633.98-1.186v-5.877c0-.553-.44-1.082-.982-1.185zM32 42.085c-5.568 0-10.083-4.515-10.083-10.086 0-5.568 4.515-10.084 10.083-10.084 5.57 0 10.086 4.516 10.086 10.083 0 5.57-4.517 10.085-10.086 10.085z"
                             d= {this.props.svgData.PlotOuterPath}
                                 //d="M25 10 L98 65 L70 25 L16 77 L11 30 L0 4 L90 50 L50 10 L11 22 L77 95 L20 25"
                             fill="none"
                             stroke="black"
                             strokeWidth = "1"
                             //working  but when panresponder is not mentioned.
                             onPress = {()=> console.log("press on path")}
                     
                             //fill="blue"
                         />
             
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
                         rotate: "rotate(90)"
                         }}
                         rotation = {this.state.rotationAngle}
                         origin = {this.state.originOfRotation}
                         >
                         {this.renderPolygons()}
 
                         <Path
                         //d="M55.192 27.87l-5.825-1.092a17.98 17.98 0 0 0-1.392-3.37l3.37-4.928c.312-.456.248-1.142-.143-1.532l-4.155-4.156c-.39-.39-1.076-.454-1.532-.143l-4.928 3.37a18.023 18.023 0 0 0-3.473-1.42l-1.086-5.793c-.103-.543-.632-.983-1.185-.983h-5.877c-.553 0-1.082.44-1.185.983l-1.096 5.85a17.96 17.96 0 0 0-3.334 1.393l-4.866-3.33c-.456-.31-1.142-.247-1.532.144l-4.156 4.156c-.39.39-.454 1.076-.143 1.532l3.35 4.896a18.055 18.055 0 0 0-1.37 3.33L8.807 27.87c-.542.103-.982.632-.982 1.185v5.877c0 .553.44 1.082.982 1.185l5.82 1.09a18.013 18.013 0 0 0 1.4 3.4l-3.31 4.842c-.313.455-.25 1.14.142 1.53l4.155 4.157c.39.39 1.076.454 1.532.143l4.84-3.313c1.04.563 2.146 1.02 3.3 1.375l1.096 5.852c.103.542.632.982 1.185.982h5.877c.553 0 1.082-.44 1.185-.982l1.086-5.796c1.2-.354 2.354-.82 3.438-1.4l4.902 3.353c.456.313 1.142.25 1.532-.142l4.155-4.154c.39-.39.454-1.076.143-1.532l-3.335-4.874a18.016 18.016 0 0 0 1.424-3.44l5.82-1.09c.54-.104.98-.633.98-1.186v-5.877c0-.553-.44-1.082-.982-1.185zM32 42.085c-5.568 0-10.083-4.515-10.083-10.086 0-5.568 4.515-10.084 10.083-10.084 5.57 0 10.086 4.516 10.086 10.083 0 5.57-4.517 10.085-10.086 10.085z"
                             d= {this.props.svgData.PlotOuterPath}
                                 //d="M25 10 L98 65 L70 25 L16 77 L11 30 L0 4 L90 50 L50 10 L11 22 L77 95 L20 25"
                             fill="none"
                             stroke="black"
                             strokeWidth = "1"
                             //working  but when panresponder is not mentioned.
                             onPress = {()=> console.log("press on path")}
                     
                             //fill="blue"
                         />
             
                     </G>
                 </Svg>
                 
           </View>
         );
     }
     
    }
     
      
  }

  renderRotateView(){
    return(
      <View style={{flexDirection: 'row'}}>
        <Card>
          <CardSection>
            <Text style={{fontSize: 18}}>Rotate : </Text>
            <TouchableOpacity 
              style={{borderColor: '#007aff', justifyContent: 'center', alignItems: 'center', width: 30, borderWidth: 2, borderRadius: 5,}}
              onPress = {()=> this.rotateAntiClockwise('+')}
              >
              
              <Text style={{fontSize: 20, color: '#007aff'}}>
                +
              </Text>
          
              
            </TouchableOpacity >
            <TouchableOpacity 
              style={{borderColor: '#007aff', justifyContent: 'center', alignItems: 'center',  width: 30, borderWidth: 2, marginLeft: 5, borderRadius: 5,}}
              onPress = {()=> this.rotateAntiClockwise('-')}
              >
             
              <Text style={{fontSize: 20, color: '#007aff'}}>
                -
              </Text>
      
              
            </TouchableOpacity>
            
          </CardSection>
        </Card>
      </View>
      
    )
  }

  renderColourStatusDisplay(){
    return (
      <View style = {{flexDirection: 'column'}}>
      <Card>
        <CardSection>
          <View>
            <View style={{flexDirection: 'row'}}>
                <Image
                  style = {{height: 10, width: 10, backgroundColor: 'green', alignSelf:'center'}}
                />
                <Text style={{marginLeft: 5}}>AVAILABLE</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
                <Image
                  style = {{height: 10, width: 10, backgroundColor: 'red', alignSelf:'center'}}
                />
                <Text style={{marginLeft: 5}}>SOLD</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
                <Image
                  style = {{height: 10, width: 10, backgroundColor: 'yellow', alignSelf:'center'}}
                />
                <Text style={{marginLeft: 5}}>HOLD</Text>
            </View>
          </View>
          
        </CardSection>
 
      </Card>

      

  </View>
    );
  }

  renderUtil(){
    const { height, width, marginTop, marginBottom } = this.props;
    const lowerPortionHeight = height+60
    if (this.state.isLoading){
      return <Spinner/>
    } else {
      return (
       
          <View style={{flexDirection:'row'}}>
          <Card>
            <CardSection>
            {this.renderSvg()}
            </CardSection>
          
          </Card>
          <View style={{width: 180, marginRight: 20}}>
          
          {this.renderColourStatusDisplay()}
          <View style={{marginTop: 20}}> 
          {this.renderRotateView()}
          </View>
          
          <View style={{marginTop: 20}}> 
          {this.renderPlotDetailsTextView()}
          </View>
          
             
          </View>
          
        </View>
      );
    }
  }
  

  render (){

      return(
            <View>
                {this.renderUtil()}
                
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
   
    flexDirection: 'row'
  },

  buyButtonStyle: {
    flex: 1,
    color: LIGHT_BLUE_COLOR,
    padding: 10
  },
  buyTextStyle: {
    color: LIGHT_BLUE_COLOR
  }
  
});

const mapStateToProps = state => {
    return{
        svgData : state.svgData,
        albums : state.albums
    }
}

export default connect(mapStateToProps, {albumDataChanged, svgDataChanged})(TbitsZoomableSvg);
