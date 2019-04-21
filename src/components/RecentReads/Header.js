import React from 'react';
import Theme, { createStyle } from 'react-native-theming';
import { ThemedIonicons } from '../../themes/customs/components';

export default HeaderBookmark = (props) => {
    return(
        <Theme.View style={styles.container}>
            <ThemedIonicons 
                style={styles.image} 
                name="md-time" 
                size={30} 
                color="@textColorArab"
            />  
            <Theme.Text style={styles.title}>
                {props.title}
            </Theme.Text>
        </Theme.View>
    )
}

const styles =createStyle({
    container: {
        backgroundColor: '@backgroundColor',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderColor: '@borderColor',
        flexDirection: 'row',
        alignItems: 'center'
    },
    image: {
        marginRight: 8
    },
    title: {
        fontFamily: 'Roboto-Regular',
        color: '@textColorArab',
        fontSize: 16,
    }
})