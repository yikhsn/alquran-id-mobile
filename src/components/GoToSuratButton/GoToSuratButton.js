import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../store/actionCreators';

import Theme, { createStyle } from 'react-native-theming';
import { 
    ThemedMaterialsIcon,
    ThemedTouchableOpacity
 } from '../../themes/customs/components';

class ReadHeader extends Component{
    render(){
        return(
            <Theme.View style={styles.container}>
                <ThemedTouchableOpacity
                    onPress={ () => this.props.toggleGoToAyatModal() }
                >
                    <ThemedMaterialsIcon 
                        style={styles.gotoIcon} 
                        name="page-next-outline" 
                        size={25} 
                        color="@textColorLight" 
                    />
                </ThemedTouchableOpacity>
            </Theme.View>
        )
    }
}

const styles = createStyle({    
    container: {
        marginRight: 15
    },
    gotoIcon: {
    },
})

const mapStateToProps = state => {
    return {
        suratList: state.rdc.suratList,
        goToSuratVisible: state.rdc.goToSuratVisible
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default  connect(mapStateToProps, mapDispatchToProps)(ReadHeader);