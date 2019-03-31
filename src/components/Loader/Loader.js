import React from 'react';
import {
    View,
    ActivityIndicator
} from 'react-native';

const Loader = (props) => {
    return(
        <View>
            <ActivityIndicator size="large" color="#2BC0FF" />
        </View>
    )
}

export default Loader;