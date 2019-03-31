import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Alert, StyleSheet } from 'react-native';
import { addAyatToBookmark } from '../../controllers/BookmarkController';


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
                <Text style={styles.suratResult}>QS {this.props.data.surat_nama}:{this.props.data.nomor_ayat}</Text>
                <Text style={styles.textResult}>{this.props.data.terjemahan}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    result: {
        backgroundColor: '#ffffff',
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#eaeaea'
    },
    suratResult: {
        fontSize: 16,
        color: '#444444'
    },
    textResult: {
        fontSize: 16,
        color: '#666666'
    }
})

export default ResultList;
