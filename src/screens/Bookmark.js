import React, { Component } from 'react';
import { View, FlatList, ScrollView } from 'react-native';
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
            ayat_bookmarks: []
        }
    }

    componentDidMount() {
        this.initBookmarks();

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

    render(){
        return(
            <ScrollView>
                <HeaderBookmark title="SURAT BOOKMARK" />
                {

                    this.state.surat_bookmarks.length > 0
                    ?
                        <FlatList
                            data={ this.state.surat_bookmarks }
                            renderItem={ ({ item }) => {
                                return <BookmarkSuratList 
                                    surat={item}
                                    navigation={this.props.navigation}
                                    initBookmarks={this.initBookmarks}
                                /> 
                            }}
                            keyExtractor={ (item, index) => item + index }
                        />
                    : 
                        <NoBookmark />
                }

                <HeaderBookmark title="AYAT BOOKMARK" />
                {
                    this.state.ayat_bookmarks.length > 0
                    ?
                        <FlatList
                            data={ this.state.ayat_bookmarks }
                            renderItem={ ({ item }) => {
                                return <BookmarkAyatList
                                    ayat={item}
                                    navigation={this.props.navigation}
                                    initBookmarks={this.initBookmarks}
                                /> 
                            }}
                            keyExtractor={ (item, index) => item + index }
                        />
                    :
                        <NoBookmark />
                }
            </ScrollView>
        )
    }
}

export default Bookmark;