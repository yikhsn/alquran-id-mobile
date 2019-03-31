import React, { Component } from 'react';
import { View, Text, Image, StyleSheet} from 'react-native';

class HeaderSurat extends Component{
    render(){
        const { surat } = this.props;

        return(
            <View style={styles.container}>
                {/* <View style={styles.leftHeader}>
                    <Image
                        source={ require('../../assest/left.png') }
                        style={ styles.leftImageHeader}
                    />
                </View> */}
                <View style={styles.centerHeader}>
                    <Text style={styles.suratName}>{surat.surat_arab}</Text>
                    <View style={styles.suratNameBox}>
                        <Text style={styles.suratNameId}>{surat.surat_nama}</Text>
                        <Text style={styles.suratNameMean}>({surat.surat_arti})</Text>
                    </View>
                    <Text style={styles.ayatTotal}>{surat.ayat_total} Ayat</Text>
                </View>
                {/* <View style={styles.rightHeader}>
                    <Image 
                        source={ require('../../assest/right.png') }
                        style={ styles.leftImageHeader}
                    />
                </View> */}

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
        paddingVertical: 15,
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
        fontSize: 58,
        color: '#444444',
        fontFamily: 'scheherazade-webfont',
    },
    suratNameBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5
    },
    suratNameId: {
        fontSize: 18,
        color: '#666666',
        paddingHorizontal: 2
    },
    suratNameMean: {
        fontSize: 18,
        color: '#666666',
        paddingHorizontal: 2
    },
    ayatTotal: {
        fontSize: 18,
        color: '#666666'
    },
})

export default HeaderSurat;