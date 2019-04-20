import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import Theme, { createStyle } from 'react-native-theming';

const Bismillah = (props) => {
    return(
        <Theme.View style={styles.container}>
            <Theme.Text style={styles.ayat}>بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</Theme.Text>
        </Theme.View>
    )
}

const styles = createStyle({
    container: {
        backgroundColor: '@backgroundColor',
        paddingVertical: 5,
        paddingHorizontal: 5,
        borderColor: '@borderColor',
        borderBottomWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    ayat: {
        fontSize: 35,
        fontFamily: 'scheherazade-webfont',
        color: '@textColorArab',
    }
})

export default Bismillah;