import React, { Component } from 'react';
import { ImageBackground, Text, StyleSheet } from 'react-native';

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
                <Text style={styles.number}>
                    { this.props.number }
                    {/* 1 */}
                </Text>
            </ImageBackground>  
        )
    }
}

const styles = StyleSheet.create({
    number:{
        fontSize: 10,
        color: '#666666',
    },
})

export default SuratNumber;