import React, { Component } from 'react';
import { View, FlatList, Text, ScrollView } from 'react-native';
import {
    getAyatBookmarks,
    getSuratBookmarks
} from '../controllers/BookmarkController';
import BookmarkAyatList from '../components/Bookmarks/Ayat/List';
import BookmarkSuratList from '../components/Bookmarks/Surat/List';
import HeaderBookmark from '../components/Bookmarks/Header';
import NoBookmark from '../components/NoBookmark/NoBookmark';

class Bookmark extends Component{
    constructor(props){
        super(props);

        this.state = {
            surat_bookmarks: [],
            ayat_bookmarks: [],
            scrollEnabled: true
        }

        this.initBookmarks();
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
    }

    allowScroll = (scrollEnabled) => {
        this.setState({ scrollEnabled });
    }

    render(){
            return(
                <ScrollView>
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
                </ScrollView>
            )            
        }
}

export default Bookmark;