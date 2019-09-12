import React from 'react';
import {View, ActivityIndicator, Text} from 'react-native';



const Spinner = ({size}) => {
    
    return (
        <View style = {styles.spinnerStyle}>
            <ActivityIndicator size={size || 'large'} />
            <Text style={{marginLeft : 5}}>loading</Text>
        </View>
    );
}

const styles = {
   spinnerStyle: {
       flexDirection: 'row',
       justifyContent: 'center',
       alignItems: 'center',
       
       padding: 5,
   }
}

export {Spinner}