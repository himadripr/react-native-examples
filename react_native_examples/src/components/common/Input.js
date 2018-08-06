import React from 'react';
import {View, Text, TextInput} from 'react-native';

const Input = ({label, value, onChangeText, placeHolder, secureTextEntry}) => {
    const {inputStyle, labelStyle, containerStyle} = styles
    return(
        <View style = {containerStyle}>
            <Text style = {labelStyle}> 
                {label}
            </Text>
            <TextInput
                // secureTextEntry //it is a boolean value so by mentioning it we mean it is true
                placeholder = {placeHolder}
                secureTextEntry = {secureTextEntry}
                autoCorrect ={false}
                value = {value}
                onChangeText = {onChangeText}
                style = {inputStyle}
            />
        </View>
    );
}

const styles = {
    inputStyle :{
        color: '#000',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
        lineHeight: 23, // how much space is in between each line of text
        flex: 2,
        
    },
    labelStyle:{
        fontSize: 18,
        paddingLeft: 20,
        flex: 1 
    },
    containerStyle:{
        height: 40,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    }

}

export {Input};