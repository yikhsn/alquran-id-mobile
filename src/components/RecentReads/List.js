import React, { Component } from 'react';
import { 
    View,
    Text,
    Alert,
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import Swipeout from 'react-native-swipeout';
import Icon from 'react-native-vector-icons/Ionicons';
import { deleteFromRecentReads } from '../../controllers/RecentReadsController';

class BookmarkAyatList extends Component{    
    deleteRecentReads =  (value) => {
        deleteFromRecentReads(value).then( (msg) =>  this.props.initBookmarks());
    }

    render(){
        let swipeRightButton = [
            {
                text: 'Hapus',
                backgroundColor: '#ff445b',
                color: '#ffffff',
                underlayColor: '#f78',
                onPress: () => this.deleteRecentReads(ayat.id)
            }
        ]

        const { ayat } = this.props;

        const date = new Date(ayat.created_at);

        const datePrint = ((new Date().getTime()) - date.getTime()) / (1000*60*60*24) > 1 
            ? `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}` 
            : `${date.getHours()}:${date.getMinutes()}`;

        return(
            <Swipeout
                right={swipeRightButton}
                autoClose={true}
                scroll={ (event) => this.props.allowScroll(event)}
            >
                <TouchableOpacity style={styles.container}
                    onPress={ () => this.props.navigation.navigate('Surat', {
                        surat: ayat,
                        surat_id: ayat.nomor_surat
                    })}
                >
                    <View style={styles.left}>
                        <Icon style={styles.image} name="md-bookmark" size={20} color="#444444"/>
                        <Text style={styles.surat}>QS. {ayat.surat_nama}</Text>
                        <Text style={styles.ayat}>:Ayat { ayat.nomor_ayat }</Text>
                    </View>

                    <View style={styles.right}>
                        <Text style={styles.time}>
                            { datePrint }
                        </Text>
                    </View>
                </TouchableOpacity>
            </Swipeout>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingRight: 10,
        paddingLeft: 40,
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
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        color: '#444444',
    },
    ayat: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        color: '#444444'
    },
    image: {
        marginRight: 5
    },
    time: {
        fontFamily: 'Roboto-Regular',
        fontSize: 14,
        color: '#555555'
    }

})

export default BookmarkAyatList;