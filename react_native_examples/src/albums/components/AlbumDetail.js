import React from 'react';
import {View, Text, Image, Linking} from 'react-native'
import {Card, CardSection, Button} from '../../components/common'



//const AlbumDetail = (props) => {
    //destructuring arguments
const AlbumDetail = ({data}) => {

    const {title, artist, thumbnail_image, image, url} = data;
    const {imageStyle, thumbnailStyle,headerTextStyle, headerContentStyle, thumbnailContainerStyle} = styles;
    return(
        <Card>
            <CardSection>
                <View style = {thumbnailContainerStyle}>
                    <Image 
                        source ={{uri: thumbnail_image}}
                        style = {thumbnailStyle}/>
                </View>
                <View style = {headerContentStyle}>
                    <Text style = {headerTextStyle}>{title}</Text>
                    <Text>{artist}</Text>
                </View>
                
            </CardSection>
            <CardSection>
                <Image 
                    source= {{uri: image}}
                    style= {imageStyle}/>
            </CardSection>

            <CardSection>
                {/* <Button onPress = {() => Linking.openURL(url)} text = {'Buy Now'}/> */}
                <Button onPress = {() => Linking.openURL(url)} >
                    Buy Now
                </Button>
            </CardSection>


        </Card>
    );
};

const styles = {
    headerContentStyle: {
        flexDirection: 'column',
        justifyContent: 'space-around'
    },

    headerTextStyle: {
        fontSize: 18
    },

    thumbnailStyle: {
        height: 50,
        width: 50
    },

    thumbnailContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10
    },
    imageStyle :{
        height: 300,
        flex: 1,
        width: null
    }
}

export default AlbumDetail;