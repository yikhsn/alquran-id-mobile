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
import HeaderResultList from '../components/ResultList/HeaderResultList';

class Search extends Component{
    render(){
        return(
            <ScrollView 
                style={{
                    flex: 1, 
                    backgroundColor: '#ffffff'
                }}
                keyboardShouldPersistTaps='always'
            >
                <View style={styles.container}>
                    { 
                        // cheking if in the search mode, will show the the search loading indicator
                        // if not in search mode, will show the search result of result from the request
                        this.props.datas.isSearchMode 
                        ? 
                            <Loader /> 
                        :
                            this.props.datas.search.length > 0
                            ?
                                <View>
                                    <HeaderResultList />
                                    <FlatList
                                        data={this.props.datas.search}
                                        renderItem={ ({ item }) => <ResultList 
                                        data={item}
                                        navigation={this.props.navigation}
                                        /> }
                                        keyExtractor={ (item, index) => item + index }
                                    /> 
                                </View>
                            :
                                null                                
                    }                      
                </View>

            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        // margin: 10
    }
})

const mapStateToProps = state => {
    return {
        datas: state
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Search);