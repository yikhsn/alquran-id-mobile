import React, { Component } from 'react';
import { ScrollView, FlatList } from 'react-native';
import List from '../components/Surat/List';
import { getAllSurats } from '../controllers/SuratController';

class SuratList extends Component{
    constructor(props){
        super(props);

        this.state = {
            surats: []
        }        
    }

    componentDidMount(){
        this.initListSurats();
    }

    initListSurats = () => {
        getAllSurats().then( (surats) => this.setState( { surats }));
    }
    
    render() {
        return(
            <ScrollView>
                <FlatList
                    data={ this.state.surats }
                    renderItem={ ({ item }) => {
                        return <List
                            surat={item}
                            navigation={this.props.navigation}
                        />
                    } }
                    keyExtractor={ (item, index) => item + index }
                />
            </ScrollView>
        )
    }
}

export default SuratList;