import React, { Component } from 'react';
import { 
    View,
    TextInput,
    TouchableOpacity,
    Image,
    Keyboard,
    StyleSheet 
} from 'react-native';
import { searchAyat } from '../../controllers/AyatController';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../store/actionCreators';
import Theme, { createStyle } from 'react-native-theming';
import {
    ThemedTouchableOpacity,
    ThemedTextInput,
    ThemedIonicons,
    ThemedMatIcon
} from '../../themes/customs/components'

class SearchHeader extends Component{
    state = {
        isFocused: false
    }

    // function to handle search input from the user, to set words to redux state
    handleWordChange = (words) => this.props.setWordsSearch(words);

    // function to handle search proses, when user click search button
    handleSearch = () => {

        // when user click the search button, user will be in search mode
        // then the search loading indicator will show to indicate user
        // app is searching the user input words
        this.props.setSearchMode();

        // when user makes new search, we should remove the old search result from redux state
        // that will be replaced by new search result
        this.props.setSearchResult([]);

        // close keyboard when user submit the data or click the search button
        Keyboard.dismiss();

        // then before system would do searching, check the user input is not the blank words
        if (this.props.datas.wordsSearch.trim()) this.searchAyat(this.props.datas.wordsSearch);
        else this.props.removeSearchMode();
    }

    // this function clear the user input when user click clear button
    handleClear = () => {
        this.props.setWordsSearch('')

        this.props.removeSearchMode();

        this.props.setSearchResult([]);
    }

    // function to handle value isFocused is true or false to control search icon button
    handleFocus = () => this.setState({ isFocused: !this.state.isFocused })

    // this function will be called by the user handle search 
    searchAyat = (query) => {
        
        // call function (in AyatController.js) to get data from the database, and wait
        searchAyat(query).then( (ayats) => {

            // then when the data from request is coming, set the search result to redux state
            this.props.setSearchResult(ayats);

            // then set wordsSearch data state to wordsSearched data state to
            this.props.setWordsSearched();

            // then remove search mode, to remove searcing loading indicator and replace
            // with the search result
            this.props.removeSearchMode();
        });
    }

    render(){
        return(
            <Theme.View style={styles.container}>
                <Theme.View style={styles.inputContainer}>
                    <ThemedTextInput
                        style={styles.input}
                        value={this.props.datas.wordsSearch}
                        multiline={false}
                        autoCorrect={false}
                        autoFocus={false}
                        autoCapitalize='none'
                        placeholder={'Cari...'}
                        placeholderTextColor='@textPlaceHolderSearch'
                        onChangeText={(words) => this.handleWordChange(words) }
                        onSubmitEditing={ () => this.handleSearch() }
                        onFocus={ () => this.handleFocus() }
                        onBlur={ () => this.handleFocus() }
                        underlineColorAndroid='transparent'
                    />
                    {
                        this.state.isFocused
                        ?
                            (
                                this.props.datas.wordsSearch
                                ?
                                    <Theme.View style={{
                                        flexDirection: 'row'
                                    }}>
                                        <ThemedTouchableOpacity
                                            style={ styles.buttonContainer }
                                            onPress={ () => this.handleClear() }
                                        >
                                            <ThemedMatIcon
                                                style={styles.imageActive}
                                                name="clear" 
                                                size={32} 
                                                color="@textColorArabLight"
                                            />
                                        </ThemedTouchableOpacity>
                                    </Theme.View>
                                :
                                    <Theme.View style={styles.buttonContainer}>
                                        <ThemedIonicons
                                            style={styles.imageDisabled}
                                            name="ios-search" 
                                            size={30} 
                                            color="@textColorArabLight"
                                        />
                                    </Theme.View>
                            )

                        :
                            <Theme.View style={styles.buttonContainer}>
                                <ThemedIonicons
                                    style={styles.imageDisabled}
                                    name="ios-search" 
                                    size={30} 
                                    color="@textColorArabLight"
                                />
                            </Theme.View>
                    }
                </Theme.View>
        </Theme.View>
        )
    }
}

const styles = createStyle({
    container: {
        elevation: 5,
        flexDirection: 'row',
        height: 58,
        backgroundColor: '@buttonColorPrimary',
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,  
    },
    logoContainer: {
        width: '10%'
    },
    inputContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '@buttonColorTertiary',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        paddingLeft: 10,
        borderRadius: 15,
        alignSelf: 'flex-end'
    },
    input: {
        flex: 1,
        flexDirection: 'row',
        padding: 5,
        height: 40,
        fontFamily: 'Roboto-Regular',
        fontSize: 20,
        color: '@textColorArabLight',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '@buttonColorTertiary',
        borderRadius: 15
    },
    buttonContainer: {
        width: 35,
        color: '@textColorLight',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageDisabled: {
        marginRight: 5,
        opacity: 0.5
    },
    imageActive: {
        marginRight: 5,
    }
});

const mapStateToProps = state => {
    return {
        datas: state.rdc
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SearchHeader);