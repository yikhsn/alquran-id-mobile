import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Alert,
    StyleSheet
} from 'react-native';
import { deleteSuratBookmark } from '../../../controllers/BookmarkController';

class BookmarkSuratList extends Component{
    
    deleteBookmark =  (value) => {
        deleteSuratBookmark(value).then( (msg) => {
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
        const { surat } = this.props;

        const date = new Date(surat.created_at);

        const datePrint = ((new Date().getTime()) - date.getTime()) / (1000*60*60*24) > 1 
            ? `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}` 
            : `${date.getMinutes()}:${date.getHours()}`;

        return(
            <TouchableOpacity style={styles.container}
                onPress={() => this.props.navigation.navigate('Surat', {
                    surat: surat,
                    surat_id: surat.surat_id

                })}
                onLongPress={ () => this.deleteBookmark(surat.id) }
            >
                <View style={styles.left}>
                    <Text style={styles.name}>
                        {surat.surat_nama}
                    </Text>
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
    name: {
        fontSize: 16,
        color: '#444444'
    },
    time: {
        fontSize: 14,
        color: '#555555'
    }

})

export default BookmarkSuratList;