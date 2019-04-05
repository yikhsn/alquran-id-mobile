import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';


class SuratName extends Component{
    render(){
        return(
            <View style={styles.surat}>
                <Text style={styles.name}>
                    { this.props.nama }
                </Text>
                <Text style={styles.translation}>
                    { this.props.arti }
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    surat: {
        justifyContent:'center',
    },
    name: {
        color: '#444444',
        fontFamily: 'Roboto-Regular',
        fontSize: 18
    },
    translation: {
        color: '#555555',
        fontSize: 14,
        fontFamily: 'Roboto-Regular',
    },
})

export default SuratName;