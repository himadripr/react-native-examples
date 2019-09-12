import React from 'react'
import {View} from 'react-native'

const CardSection = (props) =>{
    return (
        //Here the rightmost style will override the style props which is changed
        <View style = {styles.containerStyle}> 
            {props.children}
        </View>
    );
};

const styles = {
    containerStyle:{
        borderBottomWidth: 1,
        padding: 5,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderColor: '#ddd',
        position: 'relative'
    }
}

export  {CardSection};