import React, { Component } from 'react';
import { deleteSuratBookmark } from '../../../controllers/BookmarkController';
import Theme, { createStyle } from 'react-native-theming';
import {
    ThemedSwipeout,
    ThemedTouchableOpacity,
    ThemedIonicons,
} from '../../../themes/customs/components';

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
            <ThemedSwipeout 
                right={swipeRightButton}
                close={true}
                scroll={ (event) => this.props.allowScroll(event)}
            >
                <ThemedTouchableOpacity 
                    style={styles.container}
                    activeOpacity={0.6}
                    onPress={() => this.props.navigation.navigate('Surat', {
                        surat: surat,
                        surat_id: surat.surat_id

                    })}
                >
                    <Theme.View style={styles.left}>
                        <ThemedIonicons 
                            style={styles.image} 
                            name="md-bookmark" 
                            size={20} 
                            color="@textColorPrimary"
                        />
                        <Theme.Text style={styles.name}>
                            QS. {surat.surat_nama}
                        </Theme.Text>
                    </Theme.View>
                    <Theme.View style={styles.right}>
                        <Theme.Text style={styles.time}>
                            { datePrint }
                        </Theme.Text>
                    </Theme.View>
                </ThemedTouchableOpacity>
            </ThemedSwipeout>            
        )
    }
}

const styles = createStyle({
    container: {
        paddingVertical: 10,
        paddingRight: 10,
        paddingLeft: 40,
        backgroundColor: '@backgroundColor',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '@borderColor',
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
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        color: '@textColorPrimary'
    },
    image: {
        marginRight: 5
    },
    time: {
        fontFamily: 'Roboto-Regular',
        fontSize: 14,
        color: '@textColorSecondary'
    }
})

export default BookmarkSuratList;