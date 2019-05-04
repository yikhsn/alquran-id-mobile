import React, { Component } from 'react';
import {
    ImageBackground,
    View
} from 'react-native';
import Theme, { createStyle } from 'react-native-theming';
import {
    ThemedTouchableOpacity,
    ThemedTouchableHighlight
} from '../../themes/customs/components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../store/actionCreators';

class Ayat extends Component{    
    render(){
        const { ayat } = this.props;
        
        return(
            <ThemedTouchableOpacity 
                style={styles.container}
                activeOpacity={0.5}
                onPress={ () => this.props.handleAyatPressed(ayat) }
            >
            <View style={styles.boxAyat}>            
                <Theme.View style={styles.left}>
                    {
                        this.props.darkMode
                        ?
                            <ImageBackground
                                source={ require('../../assets/oval-dark.png') }
                                style={{
                                    width: 40,
                                    height: 50,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Theme.Text style={styles.number}>{ayat.nomor_ayat}</Theme.Text>
                            </ImageBackground>
                        :
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
                    }
                </Theme.View>
                <Theme.View style={styles.right}>
                    <Theme.View style={styles.ayatContainer}>
                        <Theme.Text style={styles.ayat}>{ayat.ayat}</Theme.Text>
                    </Theme.View>

                    <Theme.View style={styles.ayatMeanContainer}>
                        <Theme.Text style={styles.ayatMean}>{ayat.terjemahan}</Theme.Text>
                    </Theme.View>
                </Theme.View>
            </View>            
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
    },
    boxAyat: {
        display: 'flex',
        flexDirection: 'row' 
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
        color: '@textColorArab'
    },
    ayatContainer: {
        flex: 1,
        padding: 5,
    },
    ayat: {
        fontSize: 35,
        fontFamily: 'scheherazade-webfont',
        color: '@textColorArab',
    },
    ayatMeanContainer: {
        padding: 5
    },
    ayatMean: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        color: '@textColorSecondary'
    }
});

const mapStateToProps = state => {
    return {
        darkMode: state.theme.darkMode,
    }
}

const mapDisptatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDisptatchToProps)(Ayat);