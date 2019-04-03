import React, { Component } from 'react';
import { ScrollView, FlatList } from 'react-native';
import List from '../components/Surat/List';
import { getAllSurats } from '../controllers/SuratController';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../store/actionCreators';

class SuratList extends Component{
    constructor(props){
        super(props);

        this.state = {
            scrollEnabled: true
        }        
    }

    componentDidMount(){
        this.initListSurats();
    }

    initListSurats = () => {
        getAllSurats().then( (surats) => this.props.setSuratList(surats));
    }

    allowScroll = (scrollEnabled) => {
        this.setState({ scrollEnabled });
    }
    
    render() {

        console.log(this.props.suratList);
        return(
            <ScrollView scrollEnabled={this.state.scrollEnabled} >
                <FlatList
                    data={ this.props.suratList }
                    renderItem={ ({ item }) => {
                        return <List
                            surat={item}
                            navigation={this.props.navigation}
                            allowScroll={this.allowScroll}
                        />
                    } }
                    keyExtractor={ (item, index) => item + index }
                />
            </ScrollView>
        )
    }
}

const mapStateToProps = state => {
    return {
        suratList: state.suratList
    }
}

const mapDisptatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDisptatchToProps)(SuratList);