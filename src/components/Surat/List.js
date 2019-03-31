import React, { Component } from 'react';
import { 
    View,
    TouchableOpacity,
    Text,
    Alert,
    StyleSheet
} from 'react-native';

import { addSuratToBookmark } from '../../controllers/BookmarkController';

import SuratName from './SuratName';
import SuratNumber from './SuratNumber';

class SuratList extends Component{
    constructor(props){
        super(props);

    }

    addToBookmark = (id) => {
        addSuratToBookmark(id).then( msg => {
            Alert.alert(
                msg,
                msg,
                [
                    {
                        text: 'OK',
                        onPress: () => this.props.navigation.navigate('Read')
                    },
                ],
                { cancelable: false }
            );
        })
    }
    
    render(){
        const { surat } = this.props;

        return(
            <TouchableOpacity style={styles.container}
                onPress={() => this.props.navigation.navigate('Surat', {
                    surat: surat,
                    surat_id: surat.id
                })}
                onLongPress={() => this.addToBookmark(surat.id)}
            >
                <View style={styles.left}>
                    <SuratNumber
                        number={ surat.id }
                    />

                    <SuratName
                        nama={surat.surat_nama}
                        arti={surat.surat_arti}
                    />

                </View>
                <View style={styles.right}>
                    <Text style={styles.arab}>
                        {surat.surat_arab}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#eeeeee',
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
        justifyContent: 'center'
    },
    arab: {
        fontFamily: 'scheherazade-webfont',
        // fontFamily: 'kfc_naskh-webfont',
        // fontFamily: 'pdms_saleem-webfont',
        // fontFamily: 'me_quran-webfont',
        // fontFamily: 'xb_zar-webfont',
        color: '#444444',
        fontSize: 40,
    }

})

export default SuratList;