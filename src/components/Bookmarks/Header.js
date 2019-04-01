import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default HeaderBookmark = (props) => {
    return(
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={ require('../../assets/folder.png') }
            />    
            <Text style={styles.title}>
                {props.title}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderColor: '#eaeaea',
        flexDirection: 'row',
        alignItems: 'center'
    },
    image: {
        width: 22,
        height: 22,
        marginRight: 5
    },
    title: {
        color: '#444444',
        fontSize: 16,
    }
})