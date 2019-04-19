import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Theme, { createStyle } from 'react-native-theming';

class HeaderResultList extends Component{
    render(){
        return(
            <Theme.View style={styles.container}>
                <Theme.Text style={styles.title}>pencarian '{this.props.datas.wordsSearched}' - </Theme.Text>
                <Theme.Text style={styles.report}>{this.props.datas.search.length} ayat ditemukan</Theme.Text>
            </Theme.View>
        )
    }
}

const styles = createStyle({
    container: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        flexDirection: 'row',
        backgroundColor: '@backgroundColor',
        borderBottomWidth: 2,
        borderBottomColor: '@borderColor'
    },
    title: {
        fontFamily: 'Roboto-Regular',
        color: '@textColorQuaternary',
        fontSize: 16,
    },
    report: {
        fontFamily: 'Roboto-Regular',
        color: '@textColorQuaternary',
        fontSize: 16,
    }
})

const mapStateToProps = state => {
    return {
        datas: state.rdc
    }
}

export default connect(mapStateToProps)(HeaderResultList);