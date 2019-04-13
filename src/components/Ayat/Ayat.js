import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    Alert,
    StyleSheet
} from 'react-native';
import Theme, { createStyle } from 'react-native-theming';
import { ThemedTouchableOpacity } from '../../themes/customs/components';

class Ayat extends Component{    
    render(){
        const { ayat } = this.props;
        
        return(
            <ThemedTouchableOpacity 
                style={styles.container}
                onPress={ () => this.props.handleAyatPressed(ayat) }
            >
                <Theme.View style={styles.left}>
                    <ImageBackground
                        source={ require('../../assets/oval.png') }
                        style={{
                            width: 40,
                            height: 50,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Theme.Text style={styles.number}>{ayat.nomor_ayat}</Theme.Text>
                    </ImageBackground>
                </Theme.View>
                <Theme.View style={styles.right}>
                    <Theme.View style={styles.ayatContainer}>
                        <Theme.Text style={styles.ayat}>{ayat.ayat}</Theme.Text>
                    </Theme.View>

                    <Theme.View style={styles.ayatMeanContainer}>
                        <Theme.Text style={styles.ayatMean}>{ayat.terjemahan}</Theme.Text>
                    </Theme.View>
                </Theme.View>
            </ThemedTouchableOpacity>
        )
    }
}

const styles = createStyle({
    container: {
        backgroundColor: '@backgroundColor',
        paddingVertical: 10,
        paddingHorizontal: 5,
        borderColor: '@borderColor',
        borderBottomWidth: 1,
        flexDirection: 'row',
    },
    left: {
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    right: {
        flex: 1,
    },
    number: {
        fontFamily: 'Roboto-Regular',
        fontSize: 8,
        color: '@textColorPrimary'
    },
    ayatContainer: {
        flex: 1,
        padding: 5,
    },
    ayat: {
        fontSize: 35,
        fontFamily: 'scheherazade-webfont',
        color: '@textColorPrimary',
    },
    ayatMeanContainer: {
        padding: 5
    },
    ayatMean: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        color: '@textColorSecondary'
    }
})

export default Ayat;