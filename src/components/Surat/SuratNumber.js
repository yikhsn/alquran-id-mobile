import React, { Component } from 'react';
import { ImageBackground, Text, StyleSheet } from 'react-native';
import Theme, { createStyle } from 'react-native-theming';

class SuratNumber extends Component{
    render(){
        return(
            <ImageBackground
                source={ require('../../assets/star.png') }
                style={{
                    width: 50,
                    height: 50,
                    marginRight: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Theme.Text style={styles.number}>
                    { this.props.number }
                    {/* 1 */}
                </Theme.Text>
            </ImageBackground>  
        )
    }
}

const styles = createStyle({
    number:{
        fontSize: 10,
        color: '#666666',
    },
})

export default SuratNumber;