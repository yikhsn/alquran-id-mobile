import React, { Component } from 'react';
import { ImageBackground } from 'react-native';
import Theme, { createStyle } from 'react-native-theming';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../store/actionCreators';

class SuratNumber extends Component{
    render(){
        return(
            this.props.darkMode
            ?
                <ImageBackground
                    source={ require('../../assets/star-dark.png') }
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
                    </Theme.Text>
                </ImageBackground>
            :
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
                    </Theme.Text>
                </ImageBackground>
  
        )
    }
}

const styles = createStyle({
    number:{
        fontSize: 10,
        color: '@textColorPrimary',
    },
})

const mapStateToProps = state => {
    return {
        darkMode: state.theme.darkMode,
    }
}

const mapDisptatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDisptatchToProps)(SuratNumber);