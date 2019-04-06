import React, { Component } from 'react';
import { 
    View,
    TouchableOpacity,
    Text,
    Alert,
    StyleSheet
} from 'react-native';
import Swipeout from 'react-native-swipeout';
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
                msg.title,
                msg.content,
                [
                    {
                        text: 'OK',
                    },
                ],
                { cancelable: false }
            );
        })
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
                text: 'Bookmark',
                fontSize: 20,
                backgroundColor: '#2BC0FF',
                color: '#ffffff',
                underlayColor: '#f78',
                onPress: () => this.addToBookmark(surat.id)
            }
        ]

        const { surat } = this.props;

        return(
            <Swipeout
                right={swipeRightButton}
                autoClose={true}
                scroll={ (event) => this.props.allowScroll(event) }
            >
                <TouchableOpacity style={styles.container}
                    onPress={() => this.props.navigation.navigate('Surat', {
                        surat: surat,
                        surat_id: surat.id
                    })}
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
            </Swipeout>
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
        color: '#444444',
        fontSize: 40,
    }

})

export default SuratList;