import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../store/actionCreators';

class RightHeaderSuratList extends Component{
    render(){
        return(
            <View style={styles.right}>
                <TouchableOpacity
                    style={styles.reverseButton}
                    onPress={ () =>  this.props.reverseSuratList() }
                    >
                    <Icon style={styles.image} name="exchange" size={20} color="#ffffff"/>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.goToButton}
                    onPress={ () => this.props.toggleGoToSuratModal() }
                >
                    <Icon2 style={styles.gotoIcon} name="page-next-outline" size={25} color="#ffffff" />
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    right: {
        marginRight: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    goToButton : {
        alignItems: 'center',
        justifyContent: 'center',
    },
    reverseButton: {
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    gotoIcon: {
    },
    image: {
        transform: [{ rotate: '90deg' }]
    }
})

const mapStateToProps = state => {
    return {
        suratList: state.suratList,
        goToSuratVisible: state.goToSuratVisible
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default  connect(mapStateToProps, mapDispatchToProps)(RightHeaderSuratList);