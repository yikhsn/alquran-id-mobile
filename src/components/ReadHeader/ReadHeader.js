import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../store/actionCreators';

class ReadHeader extends Component{

    handleReverse = () => this.props.reverseSuratList();
    
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.left}>
                    <Text style={styles.title}>Daftar Surat</Text>
                </View>
                <View style={styles.right}>
                    <TouchableOpacity >
                        <Icon2 style={styles.gotoIcon} name="page-next-outline" size={25} color="#ffffff" />
                    </TouchableOpacity>
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
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },
    right: {
        alignContent: 'flex-end',
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
    },
    title: {
        fontSize: 22,
        fontWeight: '500',
        color: '#ffffff',
        justifyContent: 'center'
    },
    gotoIcon: {
        marginRight: 15
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