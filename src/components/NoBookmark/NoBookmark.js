import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

const NoBookmark = (props) => {
    return(
        <View style={styles.container}>
            <Text style={styles.text}>Kosong!</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingRight: 10,
        paddingLeft: 30,
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderColor: '#eaeaea',
        justifyContent: 'center',
        alignItems: 'center',        
    },
    text : {
        fontSize: 16,
        color: '#444444'
    }
})

export default NoBookmark;