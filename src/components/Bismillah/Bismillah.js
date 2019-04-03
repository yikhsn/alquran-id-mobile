import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

const Bismillah = (props) => {
    return(
        <View style={styles.container}>
            <Text style={styles.ayat}>بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 5,
        paddingHorizontal: 5,
        borderColor: '#eeeeee',
        borderBottomWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    ayat: {
        fontSize: 40,
        fontFamily: 'scheherazade-webfont',
        color: '#444444',
    }
})

export default Bismillah;