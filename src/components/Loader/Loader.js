import React from 'react';
import {
    View
} from 'react-native';
import {
    ThemedActivityIndicator,
} from '../../themes/customs/components';

const Loader = (props) => {
    return(
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <ThemedActivityIndicator size="large" color="@activityIndicatorColor" />
        </View>
    )
}

export default Loader;