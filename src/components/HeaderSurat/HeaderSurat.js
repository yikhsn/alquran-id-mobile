import React, { Component } from 'react';
import { View, Text, Image, StyleSheet} from 'react-native';

class HeaderSurat extends Component{
    render(){
        const { surat } = this.props;

        return(
            <View style={styles.container}>
                <View style={styles.centerHeader}>
                    <Text style={styles.suratName}>{surat.surat_arab}</Text>
                    <View style={styles.suratNameBox}>
                        <Text style={styles.suratNameMean}>{surat.surat_arti}</Text>
                    </View>
                    <Text style={styles.ayatTotal}>{surat.ayat_total} Ayat</Text>
                </View>
           </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 2,
        borderBottomWidth: 2,
        borderColor: '#eeeeee'
    },
    leftHeader: {
        padding: 10
    },
    leftImageHeader: {
        width: 64,
        height: 128
    },
    centerHeader: {
        alignItems: 'center',
    },
    rightHeader: {

    },
    suratName: {
        fontSize: 50,
        color: '#444444',
        top: 0,
        bottom: 35,
        fontFamily: 'scheherazade-webfont',
    },
    suratNameBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
        top: -10,
    },
    suratNameMean: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        color: '#666666',
        paddingHorizontal: 2
    },
    ayatTotal: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        color: '#666666',
        top: -15,
    },
})

export default HeaderSurat;