import React, { Component } from 'react';
import { View, Text, Image, StyleSheet} from 'react-native';
import Theme, { createStyle } from 'react-native-theming';

class HeaderSurat extends Component{
    render(){
        const { surat } = this.props;

        return(
            <Theme.View style={styles.container}>
                <Theme.View style={styles.centerHeader}>
                    <Theme.Text style={styles.suratName}>{surat.surat_arab}</Theme.Text>
                    <Theme.View style={styles.suratNameBox}>
                        <Theme.Text style={styles.suratNameMean}>{surat.surat_arti}</Theme.Text>
                    </Theme.View>
                    <Theme.Text style={styles.ayatTotal}>{surat.ayat_total} Ayat</Theme.Text>
                </Theme.View>
           </Theme.View>
        )
    }
}

const styles = createStyle({
    container: {
        flexDirection: 'row',
        backgroundColor: '@backgroundColor',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 2,
        borderBottomWidth: 2,
        borderColor: '@borderColor'
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
        color: '@textColorPrimary',
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
        color: '@textColorSecondary2',
        paddingHorizontal: 2
    },
    ayatTotal: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        color: '@textColorSecondary2',
        top: -15,
    },
})

export default HeaderSurat;