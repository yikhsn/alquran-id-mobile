import React, { Component } from 'react';
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
        color: '@textColorArab',
        fontFamily: 'Roboto-Regular',
        fontSize: 18
    },
    translation: {
        color: '@textColorPrimary',
        fontSize: 14,
        fontFamily: 'Roboto-Regular',
    },
})

export default SuratName;