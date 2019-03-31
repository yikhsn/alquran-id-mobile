import React, { Component } from 'react'
import { ScrollView, FlatList } from 'react-native';
import { getSingleSurat } from '../controllers/SuratController';
import HeaderSurat from '../components/HeaderSurat/HeaderSurat';
import Ayat from '../components/Ayat/Ayat';
import Bismillah from '../components/Bismillah/Bismillah';

class Surat extends Component{
    constructor(props){
        super(props);

        this.state = {
            ayats: []
        }
    }

    static navigationOptions = ({ navigation }) => ({
        title: 'Surat ' + navigation.state.params.surat.surat_nama,
    })

    componentDidMount(){
        this.initSurat();
    }

    initSurat = () => {
        const surat_id = this.props.navigation.getParam('surat_id', null);
        getSingleSurat(surat_id).then( (ayats) => this.setState({ ayats }));
    }
    
    render(){
        const surat = this.props.navigation.getParam('surat', null);
           
        return(
            <ScrollView>
                <HeaderSurat
                    surat={surat}
                />
                <Bismillah />
                <FlatList
                    data={ this.state.ayats }
                    renderItem={ ({ item }) => {
                        return <Ayat 
                            ayat={item}
                            navigation={this.props.navigation}
                        />
                    }}
                    keyExtractor={ (item, index) => item + index }
                />
            </ScrollView>
        )
    }
}

export default Surat;