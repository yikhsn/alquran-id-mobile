import React, { Component } from 'react';
import {
    View,
    FlatList,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../store/actionCreators';
import Loader from '../components/Loader/Loader';
import ResultList from '../components/ResultList/ResultList';
import HeaderResultList from '../components/ResultList/HeaderResultList';
import Theme, { createStyle } from 'react-native-theming';
import {
    ThemedScrollView
} from '../themes/customs/components';

class Search extends Component{
    render(){
        return(
            <ThemedScrollView 
                style={styles.container}
                keyboardShouldPersistTaps='always'
                contentContainerStyle={{ flexGrow: 1 }}
            >
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
        </ThemedScrollView>
        )
    }
}

const styles = createStyle({
    container: {
        flex: 1,
        backgroundColor: '@backgroundColor'
    }
})

const mapStateToProps = state => {
    return {
        datas: state.rdc
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Search);