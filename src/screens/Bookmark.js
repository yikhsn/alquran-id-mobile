import React, { Component } from 'react';
import { View, Dimensions, FlatList, Platform } from 'react-native';
import {
    getAyatBookmarks,
    getSuratBookmarks, 
} from '../controllers/BookmarkController';
import { 
    getRecentReads,
    deleteFromRecentReads
} from '../controllers/RecentReadsController';
import BookmarkAyatList from '../components/Bookmarks/Ayat/List';
import BookmarkSuratList from '../components/Bookmarks/Surat/List';
import HeaderBookmark from '../components/Bookmarks/Header';
import HeaderRecentReads from '../components/RecentReads/Header';
import ListRecentReads from '../components/RecentReads/List';
import NoBookmark from '../components/NoBookmark/NoBookmark';

import Theme, { createStyle } from 'react-native-theming';
import ThemeConstants from '../themes/navigations/ThemeConstants';
import { 
    ThemedScrollView,
    ThemedTouchableOpacity,
    ThemedMatIcon
} from '../themes/customs/components';
import Modal from 'react-native-modal';
// import console = require('console');

class Bookmark extends Component{
    constructor(props){
        super(props);

        this.state = {
            surat_bookmarks: [],
            ayat_bookmarks: [],
            recent_reads: [],
            scrollEnabled: true,

            // for "RecentRead" Modal
            isRecentReadModalVisible: false,
            ayatInRecentRead: {
                ayat_id: null,
                ayat_total: null,
                created_at: "",
                id: null,
                nomor_ayat: null,
                nomor_surat: null,
                surat_arab: "",
                surat_arti: "",
                surat_nama: "",
            }
        }

        this.initBookmarks();
    }

    static navigationOptions = ({ screenProps }) => {
        let currentTheme = ThemeConstants[screenProps.theme];
        
        return {
            headerTintColor: currentTheme.headerTintColor,
            headerStyle: {
                backgroundColor: currentTheme.backgroundColor,
                borderBottomColor: currentTheme.borderColor,
            },
            headerTitleStyle: {
                color: currentTheme.headerTitleColor,
                fontSize: currentTheme.headerTitleFontSize,
                fontFamily: currentTheme.headerTitleFontFamily,
            },
        }
    }

    componentDidMount() {
        this._navListener = this.props.navigation.addListener('didFocus', () => {
            this.initBookmarks();
        });
    }

    componentWillUnmount() {
        this._navListener.remove();
    }

    initBookmarks = () => {
        getAyatBookmarks()
            .then( (ayat_bookmarks) => this.setState( {ayat_bookmarks}) );
        
        getSuratBookmarks()
            .then( (surat_bookmarks) => this.setState( {surat_bookmarks} ));

        getRecentReads()
            .then( (recent_reads) => this.setState( {recent_reads} ));   
    }

    allowScroll = (scrollEnabled) => {
        this.setState({ scrollEnabled });
    }

    deleteRecentReads =  (value) => {
        deleteFromRecentReads(value).then( (msg) =>  this.initBookmarks());
    }

    handleRecentReadDeleteButton = (id) => {
        this.deleteRecentReads(id);

        this.toggleRecentReadActionModal(false);
    }

    toggleRecentReadActionModal = (isRecentReadModalVisible) => {
        this.setState({isRecentReadModalVisible});
    }

    setDataToRecentReadModal = (ayatInRecentRead) => this.setState({ayatInRecentRead});

    render(){
            const deviceWidth = Dimensions.get("window").width;
            const deviceHeight = Platform.OS === "ios"
                ? Dimensions.get("window").height
                : require("react-native-extra-dimensions-android").get("REAL_WINDOW_HEIGHT");

            return(
                <ThemedScrollView style={styles.container} >
                    {
                        this.state.recent_reads.length > 0
                        ?
                            null
                        :
                            (
                                this.state.surat_bookmarks.length > 0
                                ?
                                    null
                                :
                                    (
                                        this.state.ayat_bookmarks.length > 0
                                        ?
                                            null
                                        :
                                            <NoBookmark />
                                    )
                            )
                    }
                    {
                        this.state.recent_reads.length > 0
                        ?
                            <View>
                                <HeaderRecentReads title="TERAKHIR DIBACA" />
                                <FlatList
                                    data={ this.state.recent_reads }
                                    renderItem={ ({ item }) => {
                                        return <ListRecentReads
                                            ayat={item}
                                            navigation={this.props.navigation}
                                            initBookmarks={this.initBookmarks}
                                            allowScroll={this.allowScroll}
                                            deleteRecentReads={this.deleteRecentReads}
                                            toggleRecentReadActionModal={this.toggleRecentReadActionModal}
                                            setDataToRecentReadModal={this.setDataToRecentReadModal}
                                        /> 
                                    }}
                                    keyExtractor={ (item, index) => item + index }
                                />
                            </View>
                        :
                            null
                    }
                    
                    {
                        this.state.surat_bookmarks.length > 0
                        ?
                        <View>
                            <HeaderBookmark title="SURAT BOOKMARK" />
                            <FlatList
                                data={ this.state.surat_bookmarks }
                                renderItem={ ({ item }) => {
                                    return <BookmarkSuratList 
                                        surat={item}
                                        navigation={this.props.navigation}
                                        initBookmarks={this.initBookmarks}
                                        allowScroll={this.allowScroll}
                                    /> 
                                }}
                                keyExtractor={ (item, index) => item + index }
                            />
                        </View>                    
                        : 
                            null
                    }
    
                    {
                        this.state.ayat_bookmarks.length > 0
                        ?
                            <View>
                                <HeaderBookmark title="AYAT BOOKMARK" />
                                <FlatList
                                    data={ this.state.ayat_bookmarks }
                                    renderItem={ ({ item }) => {
                                        return <BookmarkAyatList
                                            ayat={item}
                                            navigation={this.props.navigation}
                                            initBookmarks={this.initBookmarks}
                                            allowScroll={this.allowScroll}
                                        /> 
                                    }}
                                    keyExtractor={ (item, index) => item + index }
                                />
                            </View>
                        :
                            null
                    }

                <View>
                    <Modal 
                        isVisible={this.state.isRecentReadModalVisible}
                        deviceWidth={deviceWidth}
                        deviceHeight={deviceHeight} 
                        animationInTiming={500}
                        animationOutTiming={500}
                        style={{
                            flex: 1,
                            justifyContent: "flex-end",
                            margin: 0,
                            alignItems: "center",
                        }}
                        onBackdropPress={ () => this.toggleRecentReadActionModal(false) }
                    >
                        <Theme.View style={styles.modalListContainer}>
                            <Theme.View style={styles.modalListHeader} >
                                <Theme.Text style={styles.modalListTitle}>
                                    { `QS. ${this.state.ayatInRecentRead.surat_nama}:Ayat ${this.state.ayatInRecentRead.nomor_ayat}` }
                                </Theme.Text>
                            </Theme.View>
                            <Theme.View style={styles.modalListContent}>
                                <ThemedTouchableOpacity 
                                    onPress={ () => 
                                       this.handleRecentReadDeleteButton(this.state.ayatInRecentRead.id)
                                    } 
                                    style={styles.modalListButton}
                                >
                                    <ThemedMatIcon 
                                        name='library-add' size={28} color='@textColorArab'
                                        style={styles.modalListButtonIcon}
                                    />
                                    <Theme.Text style={styles.modalListButtonText}>
                                        Hapus sebagai terkahir dibaca
                                    </Theme.Text>
                                </ThemedTouchableOpacity>
                                <ThemedTouchableOpacity
                                    onPress={ () => this.toggleRecentReadActionModal(false) } 
                                    style={styles.modalListButton}
                                >
                                    <ThemedMatIcon 
                                        name='close' size={28} color='@textColorArab'
                                        style={styles.modalListButtonIcon}
                                    />
                                    <Theme.Text style={styles.modalListButtonText}>Keluar</Theme.Text>
                                </ThemedTouchableOpacity>
                            </Theme.View>
                        </Theme.View>
                    </Modal>
                </View>
                </ThemedScrollView>
            )            
        }
}

const styles = createStyle({
    container: {
        flex: 1,
        backgroundColor: '@backgroundColor'
    },

    // style for modal list
    modalListContainer: {
        width: '100%',
        backgroundColor: '@backgroundColor',
    },
    modalListHeader: {
        padding: 20
    },
    modalListTitle: {
        fontSize: 17,
        fontWeight: '500',
        alignSelf: 'center',
        fontFamily: 'Roboto-Regular',
        color: '@textColorArab'
    },
    modalListContent: {
        alignItems: 'center',
        justifyContent: 'center',
    }, 
    modalListButton: {
        padding: 15,
        width: '100%',
        flexDirection: 'row',
        backgroundColor: '@backgroundColor',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    modalListButtonIcon: {
        marginRight: 5,
    },
    modalListButtonText: {
        color: '@textColorArab',
        fontFamily: 'Roboto-Regular',
        fontSize: 16
    }
})

export default Bookmark;