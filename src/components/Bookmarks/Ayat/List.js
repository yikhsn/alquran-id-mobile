import React, { Component } from 'react';
import { 
    View,
    Text,
    Alert,
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { deleteAyatBookmark } from '../../../controllers/BookmarkController';
import Theme, { createStyle } from 'react-native-theming';
import {
    ThemedSwipeout,
    ThemedTouchableOpacity,
    ThemedIonicons,
} from '../../../themes/customs/components';

class BookmarkAyatList extends Component{    
    deleteBookmark =  (value) => {
        deleteAyatBookmark(value).then( (msg) =>  this.props.initBookmarks());
    }

    render(){
        let swipeRightButton = [
            {
                text: 'Hapus',
                backgroundColor: '#ff445b',
                color: '#ffffff',
                underlayColor: '#f78',
                onPress: () => this.deleteBookmark(ayat.id)
            }
        ]

        const { ayat } = this.props;

        const date = new Date(ayat.created_at);

        const datePrint = ((new Date().getTime()) - date.getTime()) / (1000*60*60*24) > 1 
            ? `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}` 
            : `${date.getHours()}:${date.getMinutes()}`;

        return(
            <ThemedSwipeout
                right={swipeRightButton}
                autoClose={true}
                scroll={ (event) => this.props.allowScroll(event)}
            >
                <ThemedTouchableOpacity 
                    style={styles.container}
                    activeOpacity={0.6}
                    onPress={ () => this.props.navigation.navigate('Surat', {
                        surat: ayat,
                        surat_id: ayat.nomor_surat,
                        ayatGoToId: ayat.nomor_ayat
                    })}
                >
                    <Theme.View style={styles.left}>
                        <ThemedIonicons
                            style={styles.image}
                            name="md-bookmark" 
                            size={20} 
                            color="@textColorPrimary"
                        />
                        <Theme.Text style={styles.surat}>
                            QS. {ayat.surat_nama}
                        </Theme.Text>
                        <Theme.Text style={styles.ayat}>
                            :Ayat { ayat.nomor_ayat }
                            </Theme.Text>
                    </Theme.View>

                    <Theme.View style={styles.right}>
                        <Theme.Text style={styles.time}>
                            { datePrint }
                        </Theme.Text>
                    </Theme.View>
                </ThemedTouchableOpacity>
            </ThemedSwipeout>

        )
    }
}

const styles = createStyle({
    container: {
        paddingVertical: 10,
        paddingRight: 10,
        paddingLeft: 40,
        backgroundColor: '@backgroundColor',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '@borderColor',
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
        color: '@textColorPrimary',
    },
    ayat: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        color: '@textColorPrimary'
    },
    image: {
        marginRight: 5
    },
    time: {
        fontFamily: 'Roboto-Regular',
        fontSize: 14,
        color: '@textColorPrimary'
    }

})

export default BookmarkAyatList;