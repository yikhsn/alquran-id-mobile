import React, { Component } from 'react';
import { View, FlatList, ScrollView } from 'react-native';
import {
    getAyatBookmarks,
    getSuratBookmarks
} from '../controllers/BookmarkController';
import BookmarkAyatList from '../components/Bookmarks/Ayat/List';
import BookmarkSuratList from '../components/Bookmarks/Surat/List';
import HeaderBookmark from '../components/Bookmarks/Header';

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
                {
                    this.state.surat_bookmarks.length > 0
                    ?
                        <View>
                            <HeaderBookmark title="Surat Bookmark" />
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
                        </View>
                    : 
                        null
                }
                {
                    this.state.ayat_bookmarks.length > 0
                    ?
                        <View>
                            <HeaderBookmark title="Ayat Bookmark" />
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
                        </View>
                    :
                        null
                }
            </ScrollView>
        )
    }
}

export default Bookmark;