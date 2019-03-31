import React, { Component } from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';

import Juz from '../components/Juz/Juz';

class Juzlist extends Component{
    // static navigationOptions = {
    //     title: 'Baca Berdasarkan Juz'
    // }
    
    render(){
        return(
            <ScrollView>
                <Juz />
                <Juz />
                <Juz />
                <Juz />
                <Juz />
                <Juz />
                <Juz />
                <Juz />
                <Juz />
                <Juz />
                <Juz />
                <Juz />
                <Juz />
                <Juz />
            </ScrollView>
        )
    }
}

export default Juzlist;