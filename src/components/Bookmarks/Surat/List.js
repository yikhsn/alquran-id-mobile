import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Image,
    StyleSheet
} from 'react-native';
import Swipeout from 'react-native-swipeout';
import { deleteSuratBookmark } from '../../../controllers/BookmarkController';

class BookmarkSuratList extends Component{
    deleteBookmark = (value) => {
        deleteSuratBookmark(value).then( (msg) => this.props.initBookmarks() );
    }
    
    render(){ 
        let swipeRightButton = [
            {
                // component: (
                //     <View
                //         style={{
                //           flex: 1,
                //           alignItems: 'center',
                //           justifyContent: 'center',
                //           flexDirection: 'column',
                //         }}
                //     >
                //         <Image source={require('../../../../../images/delete_white.png')} />
                //     </View>
                // ),
                text: 'Hapus',
                backgroundColor: '#ff445b',
                color: '#ffffff',
                underlayColor: '#f78',
                onPress: () => this.deleteBookmark(surat.id)
            }
        ]

        const { surat } = this.props;

        const date = new Date(surat.created_at);

        const datePrint = ((new Date().getTime()) - date.getTime()) / (1000*60*60*24) > 1 
            ? `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}` 
            : `${date.getHours()}:${date.getMinutes()}`;

        return(
            <Swipeout 
                right={swipeRightButton}
                close={true}
                scroll={ (event) => this.props.allowScroll(event)}
            >
                <TouchableOpacity style={styles.container}
                    onPress={() => this.props.navigation.navigate('Surat', {
                        surat: surat,
                        surat_id: surat.surat_id

                    })}
                >
                    <View style={styles.left}>
                        <Image
                            style={styles.image}
                            source={ require('../../../assets/bookmark-grey.png') }
                        /> 
                        <Text style={styles.name}>
                            QS. {surat.surat_nama}
                        </Text>
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
        paddingLeft: 37,
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
    image: {
        width: 14,
        height: 14,
        marginRight: 5
    },
    time: {
        fontSize: 14,
        color: '#555555'
    }

})

export default BookmarkSuratList;