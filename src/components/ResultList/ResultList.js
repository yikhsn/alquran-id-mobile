import React, { Component } from 'react';
import { 
    View, 
    Image,
    Text, 
    Alert, 
    StyleSheet
} from 'react-native';
// import { addAyatToBookmark } from '../../controllers/BookmarkController';
import searchExcerpter from '../../helpers/SearchExcerpt';
import Theme, { createStyle } from 'react-native-theming';
import {
    ThemedTouchableOpacity,
    ThemedMatIcon
} from '../../themes/customs/components'

class ResultList extends Component {
    // addToBookmark = (id) => {
    //     addAyatToBookmark(id).then( msg => {
    //         Alert.alert(
    //             msg,
    //             msg,
    //             [
    //                 {
    //                     text: 'OK',
    //                     onPress: () => this.props.navigation.navigate('Search')
    //                 },
    //             ],
    //             { cancelable: false }
    //         );
    //     })
    // }
    
    render(){
        return (
                <ThemedTouchableOpacity
                    style={styles.result}
                    onPress={() => this.props.navigation.navigate('Surat', {
                        surat: this.props.data,
                        surat_id: this.props.data.nomor_surat,
                        ayatGoToId: this.props.data.nomor_ayat
                    })}
                    // onLongPress={ () => this.addToBookmark( this.props.data.id ) }
                >
                    <Theme.View style={styles.left}>
                        <Theme.Text style={styles.suratResult}>
                            { (`QS. ${this.props.data.surat_nama}:Ayat ${this.props.data.nomor_ayat}`).toUpperCase() }
                        </Theme.Text>
                        <Theme.Text style={styles.textResult}>
                            {searchExcerpter(this.props.data.terjemahan)}
                        </Theme.Text>
                    </Theme.View>
                    <Theme.View style={styles.right}>
                        <ThemedMatIcon 
                            style={styles.gotoIcon} 
                            name="keyboard-arrow-right" 
                            size={25} 
                            color="@textColorTertiary" 
                        />
                    </Theme.View>
                </ThemedTouchableOpacity>
        )
    }
}

const styles = createStyle({
    result: {
        flex: 1,
        backgroundColor: '@backgroundColor',
        paddingVertical: 10,
        paddingHorizontal: 5,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '@borderColor',
        justifyContent: 'center',
        alignItems: 'center'
    },
    left: {
        flex: 1,
        paddingLeft: 10
    },
    right: {
        justifyContent: 'flex-end',
    },
    suratResult: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        marginBottom: 2,
        color: '@textColorArab',
        alignSelf: 'flex-start'
    },
    textResult: {
        fontFamily: 'Roboto-Regular',        
        fontSize: 15,
        color: '@textColorSecondary',
    },
    gotoIcon: {
        justifyContent: 'flex-end',
    }

})

export default ResultList;
