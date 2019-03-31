import React, { Component } from 'react';
import { ScrollView, FlatList } from 'react-native';
import List from '../components/Surat/List';
import { getAllSurats } from '../controllers/SuratController';

class SuratList extends Component{
    constructor(props){
        super(props);

        this.state = {
            surats: [],
            scrollEnabled: true
        }        
    }

    componentDidMount(){
        this.initListSurats();
    }

    initListSurats = () => {
        getAllSurats().then( (surats) => this.setState( { surats }));
    }

    allowScroll = (scrollEnabled) => {
        this.setState({ scrollEnabled });
    }
    
    render() {
        return(
            <ScrollView scrollEnabled={this.state.scrollEnabled} >
                <FlatList
                    data={ this.state.surats }
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

export default SuratList;