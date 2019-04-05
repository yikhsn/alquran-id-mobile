import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../store/actionCreators';

class ReadHeader extends Component{
    render(){
        return(
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={ () => this.props.toggleGoToAyatModal() }
                >
                    <Icon style={styles.gotoIcon} name="page-next-outline" size={25} color="#ffffff" />
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({    
    container: {
        marginRight: 15
    },
    title: {
        fontSize: 22,
        fontWeight: '500',
        color: '#ffffff',
        justifyContent: 'center'
    },
    gotoIcon: {
    },
})

const mapStateToProps = state => {
    return {
        suratList: state.suratList,
        goToSuratVisible: state.goToSuratVisible
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default  connect(mapStateToProps, mapDispatchToProps)(ReadHeader);