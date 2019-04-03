import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../store/actionCreators';

class ReadHeader extends Component{
    
    handleReverse = () => {
        console.log('handle reverse is called');

        this.props.reverseSuratList();
    }
    
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.left}>
                    <Text style={styles.title}>Bookmark</Text>
                </View>
                <TouchableOpacity
                    onPress={ () => this.handleReverse()}
                >
                    <Icon style={styles.image} name="exchange" size={20} color="#ffffff"/>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#2bc0ff',
        height: 57,
        paddingHorizontal: 15,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    left: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },
    right: {
      
    },
    title: {
        fontSize: 22,
        fontWeight: '500',
        color: '#ffffff',
        justifyContent: 'center'

    },
    image: {
        transform: [{ rotate: '90deg' }]
    }
})

const mapStateToProps = state => {
    return {
        suratList: state.suratList
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default  connect(mapStateToProps, mapDispatchToProps)(ReadHeader);