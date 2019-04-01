import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class HeaderResultList extends Component{
    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.title}>pencarian 'Quran' - </Text>
                <Text style={styles.report}>ditemukan 104 ayat</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#eaeaea'
    },
    title: {
        color: '#888888',
        fontSize: 16,
    },
    report: {
        color: '#888888',
        fontSize: 16,
    }
})

export default HeaderResultList;