import React from 'react';
import Theme, { createStyle } from 'react-native-theming';

const NoBookmark = (props) => {
    return(
        <Theme.View style={styles.container}>
            <Theme.Text style={styles.text}>Belum ada bookmark!</Theme.Text>
        </Theme.View>
    )
}

const styles = createStyle({
    container: {
        flex: 1,
        paddingVertical: 10,
        paddingRight: 10,
        paddingLeft: 30,
        backgroundColor: '@backgroundColor',
        justifyContent: 'center',
        alignItems: 'center',        
    },
    text : {
        fontSize: 16,
        color: '@textColorArab',
        fontFamily: 'Roboto-Regular',
    }
})

export default NoBookmark;