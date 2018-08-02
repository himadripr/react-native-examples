import React from 'react'
import {Text, TouchableOpacity} from 'react-native';

//one way to use props text another way is to use children props
const Button  = ( { onPress, children } ) => {
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
        fontSize: 16,
        fontWeight: '600', //boldness
        paddingTop: 10,
        paddingBottom: 10
    }
}

export  {Button};