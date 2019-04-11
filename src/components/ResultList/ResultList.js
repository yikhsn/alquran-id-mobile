import React, { Component } from 'react';
import { 
    View, 
    TouchableOpacity, 
    Image,
    Text, 
    Alert, 
    StyleSheet
} from 'react-native';
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
                        surat_id: this.props.data.nomor_surat,
                        ayatGoToId: this.props.data.nomor_ayat
                    })}
                    onLongPress={ () => this.addToBookmark( this.props.data.id ) }
                >
                <View style={styles.left}>
                    <Text style={styles.suratResult}>{ (`QS. ${this.props.data.surat_nama}:Ayat ${this.props.data.nomor_ayat}`).toUpperCase() }</Text>
                    <Text style={styles.textResult}>{searchExcerpter(this.props.data.terjemahan)}</Text>
                </View>
                <View style={styles.right}>
                    <Image
                        style={{
                            width: 15,
                            height: 15
                        }}
                        source={ require('../../assets/right-arrow-black.png') }
                    />
                </View>
                </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    result: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingVertical: 10,
        paddingHorizontal: 15,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#eaeaea',
        justifyContent: 'center',
        alignItems: 'center'
    },
    left: {
        flex: 1
    },
    right: {
        justifyContent: 'flex-end'
    },
    textResult: {
        fontFamily: 'Roboto-Regular',        
        fontSize: 15,
        color: '#666666',
    },
    suratResult: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        marginBottom: 2,
        color: '#444444',
        alignSelf: 'flex-start'
    },
})

export default ResultList;
