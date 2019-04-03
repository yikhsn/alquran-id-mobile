import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

class HeaderResultList extends Component{
    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.title}>pencarian '{this.props.datas.wordsSearch}' - </Text>
                <Text style={styles.report}>{this.props.datas.search.length} ayat ditemukan</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        borderBottomWidth: 2,
        borderBottomColor: '#eaeaea'
    },
    title: {
        color: '#888888',
        fontSize: 16,
    },
    report: {
        color: '#888888',
        fontSize: 16,
    }
})

const mapStateToProps = state => {
    return {
        datas: state
    }
}

export default connect(mapStateToProps)(HeaderResultList);