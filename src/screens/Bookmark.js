import React, { Component } from 'react';
import { View, FlatList, Text, ScrollView } from 'react-native';
import {
    getAyatBookmarks,
    getSuratBookmarks
} from '../controllers/BookmarkController';
import { getRecentReads } from '../controllers/RecentReadsController';
import BookmarkAyatList from '../components/Bookmarks/Ayat/List';
import BookmarkSuratList from '../components/Bookmarks/Surat/List';
import HeaderBookmark from '../components/Bookmarks/Header';
import HeaderRecentReads from '../components/RecentReads/Header';
import ListRecentReads from '../components/RecentReads/List';
import NoBookmark from '../components/NoBookmark/NoBookmark';

import Theme, { createStyle } from 'react-native-theming';
import ThemeConstants from '../themes/navigations/ThemeConstants';
import { 
    ThemedScrollView
} from '../themes/customs/components';


class Bookmark extends Component{
    constructor(props){
        super(props);

        this.state = {
            surat_bookmarks: [],
            ayat_bookmarks: [],
            recent_reads: [],
            scrollEnabled: true
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

    render(){
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
                </ThemedScrollView>
            )            
        }
}

const styles = createStyle({
    container: {
        flex: 1,
        backgroundColor: '@backgroundColor'
    }
})

export default Bookmark;