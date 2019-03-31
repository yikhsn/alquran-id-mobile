import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default HeaderBookmark = (props) => {
    return(
        <View style={styles.container}>
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
        borderColor: '#eaeaea'
    },
    title: {
        color: '#444444',
        fontSize: 16,
    }
})