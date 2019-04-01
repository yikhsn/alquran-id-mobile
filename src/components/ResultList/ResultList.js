import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Alert, StyleSheet } from 'react-native';
import { addAyatToBookmark } from '../../controllers/BookmarkController';
import searchExcerpter from '../../helpers/SearchExcerpt';

class ResultList extends Component {
    addToBookmark = (id) => {
        addAyatToBookmark(id).then( msg => {
            Alert.alert(
                msg,
                msg,
                [
                    {
                        text: 'OK',
                        onPress: () => this.props.navigation.navigate('Search')
                    },
                ],
                { cancelable: false }
            );
        })
    }
    
    render(){
        return (
                <TouchableOpacity
                    style={styles.result}
                    onPress={() => this.props.navigation.navigate('Surat', {
                        surat: this.props.data,
                        surat_id: this.props.data.nomor_surat
                    })}
                    onLongPress={ () => this.addToBookmark( this.props.data.id ) }
                >
                    <Text style={styles.suratResult}>{ (`QS. ${this.props.data.surat_nama}:Ayat ${this.props.data.nomor_ayat}`).toUpperCase() }</Text>
                    <Text style={styles.textResult}>{searchExcerpter(this.props.data.terjemahan)}</Text>
                </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    result: {
        backgroundColor: '#ffffff',
        paddingVertical: 10,
        paddingHorizontal: 15,
        // marginBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#eaeaea'
    },
    textResult: {
        fontSize: 16,
        color: '#444444',
    },
    suratResult: {
        fontSize: 16,
        marginBottom: 3,
        color: '#444444',
        alignSelf: 'flex-start'
    },
})

export default ResultList;
