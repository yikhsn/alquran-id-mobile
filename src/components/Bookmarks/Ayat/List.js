import React, { Component } from 'react';
import { 
    View,
    Text,
    Alert,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { deleteAyatBookmark } from '../../../controllers/BookmarkController';

class BookmarkAyatList extends Component{    
    deleteBookmark =  (value) => {
        deleteAyatBookmark(value).then( (msg) => {
            Alert.alert(
                msg,
                msg,
                [
                    {
                        text: 'OK',
                        onPress: () => this.props.initBookmarks()
                    },
                ],
                { cancelable: false }
            );
        });
    }

    render(){

        console.log(this.props);

        const { ayat } = this.props;

        const date = new Date(ayat.created_at);

        const datePrint = ((new Date().getTime()) - date.getTime()) / (1000*60*60*24) > 1 
            ? `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}` 
            : `${date.getMinutes()}:${date.getHours()}`;

        return(
            <TouchableOpacity style={styles.container}
                onPress={ () => this.props.navigation.navigate('Surat', {
                    surat: ayat,
                    surat_id: ayat.nomor_surat
                })}
                onLongPress={ () => this.deleteBookmark(ayat.id)}
            >
                <View style={styles.left}>
                    <Text style={styles.surat}>{ayat.surat_nama}</Text>
                    <Text style={styles.ayat}>:Ayat { ayat.nomor_ayat }</Text>
                </View>

                <View style={styles.right}>
                    <Text style={styles.time}>
                        { datePrint }
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingRight: 10,
        paddingLeft: 30,
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#eaeaea',
        justifyContent: 'center'
    },
    left: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    }, 
    right: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    surat: {
        fontSize: 16,
        color: '#444444',
        // paddingRight: 3
    },
    ayat: {
        fontSize: 16,
        color: '#444444'
    },
    time: {
        fontSize: 14,
        color: '#555555'
    }

})

export default BookmarkAyatList;