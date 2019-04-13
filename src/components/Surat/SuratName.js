import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Theme, { createStyle } from 'react-native-theming';

class SuratName extends Component{
    render(){
        return(
            <Theme.View style={styles.surat}>
                <Theme.Text style={styles.name}>
                    { this.props.nama }
                </Theme.Text>
                <Theme.Text style={styles.translation}>
                    { this.props.arti }
                </Theme.Text>
            </Theme.View>
        )
    }
}

const styles = createStyle({
    surat: {
        justifyContent:'center',
    },
    name: {
        color: '@textColorPrimary',
        fontFamily: 'Roboto-Regular',
        fontSize: 18
    },
    translation: {
        color: '@textColorSecondary',
        fontSize: 14,
        fontFamily: 'Roboto-Regular',
    },
})

export default SuratName;