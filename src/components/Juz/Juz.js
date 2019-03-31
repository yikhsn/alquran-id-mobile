import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

class Juz extends Component{
    render(){
        return(
            <TouchableOpacity style={styles.container}>
                <View style={styles.left}>
                    <Text style={styles.name}>Juz 1</Text>
                    <Text style={styles.desc}>QS 1:1 - QS 3:20</Text>
                </View>
                <View stylee={styles.right}>
                    <Text style={styles.total}>300 ayat</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#eeeeee',
        alignItems: 'center'
    },
    left: {
        flex: 1,
        justifyContent: 'center'
    },
    right: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    name: {
        fontSize: 22,
        color: '#444444'
    },
    desc: {
        fontSize: 15
    },
    total: {
        fontSize : 18
    }
})

export default Juz;