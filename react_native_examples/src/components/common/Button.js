import React from 'react'
import {Text, TouchableOpacity} from 'react-native';

var paddingTopField = 5;
var paddingBottomField = 5;
var fontSizeField = 18;

//one way to use props text another way is to use children props
const Button  = ( { onPress, children, paddingTop, paddingBottom, fontSize } ) => {
    paddingTopField = paddingTop
    paddingBottomField = paddingBottom
    fontSizeField = fontSize
    const {buttonStyle, textStyle} = styles;
    return(
        <TouchableOpacity 
            style = {buttonStyle}
            onPress = {onPress}
        >
            <Text style = {textStyle}>{children}</Text>
        </TouchableOpacity>
    );
};

const styles = {
    buttonStyle: {
        flex: 1,
        alignSelf: 'stretch', // position itself using flex box rules. //alignItems - position children
        backgroundColor: '#fff',
        borderRadius: 5,
        borderColor: '#007aff',
        borderWidth: 1,
        marginLeft: 5,
        marginRight: 5

    },
    textStyle: {
        alignSelf: 'center',
        color: '#007aff',
        fontSize: fontSizeField,
        fontWeight: '600', //boldness
        paddingTop: paddingTopField,
        paddingBottom: paddingBottomField,
        padding: 5
     
    }
}

export  {Button};