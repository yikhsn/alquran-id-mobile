import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default HeaderBookmark = (props) => {
    return(
        <View style={styles.container}>
            <Icon style={styles.image} name="md-folder-open" size={30} color="#444444"/>  
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
        marginRight: 8
    },
    title: {
        color: '#444444',
        fontSize: 16,
    }
})