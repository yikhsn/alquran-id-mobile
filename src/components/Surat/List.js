import React, { Component } from 'react';
import { 
    Alert,
} from 'react-native';
import { addSuratToBookmark } from '../../controllers/BookmarkController';

import SuratName from './SuratName';
import SuratNumber from './SuratNumber';

import Theme, { createStyle } from 'react-native-theming';
import {
    ThemedSwipeout,
    ThemedTouchableOpacity,
} from '../../themes/customs/components';

class SuratList extends Component{
    constructor(props){
        super(props);
    }

    addToBookmark = (id) => {
        addSuratToBookmark(id)
            .then( msg => {
                this.props.handleBookmarkSuratModal(true);
                this.props.setBookmarkSuratStatus(msg.title);
                this.props.setBookmarkSuratDesc( msg.content);
            })
            .catch( msg => {
                this.props.handleBookmarkSuratModal(true);
                this.props.setBookmarkSuratStatus(msg.title);
                this.props.setBookmarkSuratDesc( msg.content);
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
            <ThemedSwipeout
                right={swipeRightButton}
                autoClose={true}
                scroll={ (event) => this.props.allowScroll(event) }
            >
                <ThemedTouchableOpacity 
                    style={styles.container}
                    activeOpacity={0.6}
                    onPress={() => this.props.navigation.navigate('Surat', {
                        surat: surat,
                        surat_id: surat.id
                    })}
                >
                    <Theme.View style={styles.left}>
                        <SuratNumber
                            number={ surat.id }
                        />

                        <SuratName
                            nama={surat.surat_nama}
                            arti={surat.surat_arti}
                        />

                    </Theme.View>
                    <Theme.View style={styles.right}>
                        <Theme.Text style={styles.arab}>
                            {surat.surat_arab}
                        </Theme.Text>
                    </Theme.View>
                </ThemedTouchableOpacity>
            </ThemedSwipeout>
        )
    }
}

const styles = createStyle({
    container: {
        paddingVertical: 5,
        paddingHorizontal: 10,
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
        justifyContent: 'center'
    },
    arab: {
        fontFamily: 'scheherazade-webfont',
        color: '@textColorArab',
        fontSize: 40,
    }

})

export default SuratList;