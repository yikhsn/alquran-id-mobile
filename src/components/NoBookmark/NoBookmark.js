import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

const NoBookmark = (props) => {
    return(
        <View style={styles.container}>
            <Text style={styles.text}>Belum ada bookmark!</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 10,
        paddingRight: 10,
        paddingLeft: 30,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',        
    },
    text : {
        fontSize: 16,
        color: '#666666',
        fontFamily: 'Roboto-Regular',
    }
})

export default NoBookmark;