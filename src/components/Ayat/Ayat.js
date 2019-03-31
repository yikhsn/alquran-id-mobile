import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    Alert,
    StyleSheet
} from 'react-native';
import { addAyatToBookmark } from '../../controllers/BookmarkController';

class Ayat extends Component{
    
    addToBookmark = (id) => {
        addAyatToBookmark(id).then( (msg) => {
            Alert.alert(
                msg,
                msg,
                [
                    {
                        text: 'OK',
                        onPress: () => this.props.navigation.navigate('Surat')
                    },
                ],
                { cancelable: false }
            );
        })
    }
    
    render(){
        const { ayat } = this.props;

        return(
            <TouchableOpacity 
                style={styles.container}
                onPress={ () => this.addToBookmark(ayat.id) }
            >
                <View style={styles.left}>
                    <ImageBackground
                         source={ require('../../assets/oval.png') }
                         style={{
                            width: 40,
                            height: 40,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Text style={styles.number}>{ayat.nomor_ayat}</Text>
                    </ImageBackground>
                </View>
                <View style={styles.right}>
                    <View style={styles.ayatContainer}>
                        <Text style={styles.ayat}>{ayat.ayat}</Text>
                    </View>

                    <View style={styles.ayatMeanContainer}>
                        <Text style={styles.ayatMean}>{ayat.terjemahan}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingHorizontal: 5,
        borderColor: '#eeeeee',
        borderBottomWidth: 1,
        flexDirection: 'row',
    },
    left: {
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    right: {
        flex: 1,
    },
    number: {
        fontSize: 10,
        color: '#444444'
    },
    ayatContainer: {
        flex: 1,
        padding: 5,
    },
    ayat: {
        fontSize: 40,
        fontFamily: 'scheherazade-webfont',
        color: '#444444',
    },
    ayatMeanContainer: {
        padding: 5
    },
    ayatMean: {
        fontSize: 16,
        color: '#555555'
    }
})

export default Ayat;