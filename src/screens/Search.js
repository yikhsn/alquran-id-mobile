import React, { Component } from 'react';
import {
    View,
    ScrollView,
    FlatList,
    Text,
    StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../store/actionCreators';
import Loader from '../components/Loader/Loader';
import ResultList from '../components/ResultList/ResultList';

class Search extends Component{
    render(){
        console.log(this.props);
        return(
            <ScrollView style={{
                flex: 1, 
                backgroundColor: '#eaeaea'
            }}>
                <View style={styles.container}>
                    <View style={styles.resultContainer}>
                        { 
                            this.props.datas.isSearchMode 
                            ? 
                                <Loader /> 
                            : 
                                <FlatList
                                    data={this.props.datas.search}
                                    renderItem={ ({ item }) => <ResultList 
                                        data={item}
                                        navigation={this.props.navigation}
                                    /> }
                                    keyExtractor={ (item, index) => item + index }
                                /> 
                        }                      
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        marginTop: 10,
        marginBottom: 5
    },
    resultContainer: {
    }
})

const mapStateToProps = state => {
    return {
        datas: state
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Search);