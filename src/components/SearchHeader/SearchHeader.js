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

class SearchHeader extends Component{
    state = {
        words: '',
        isFocused: false
    }

    // function to handle search input from the user, to set words to state
    handleWordChange = (words) => this.setState({ words });

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
        if (this.state.words.trim()) this.searchAyat(this.state.words);
        else this.props.removeSearchMode();
    }

    // this function clear the user input when user click clear button
    handleClear = () => {
        this.setState({ words: '' });

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

            // then remove search mode, to remove searcing loading indicator and replace
            // with the search result
            this.props.removeSearchMode();
        });
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <TextInput 
                        style={styles.input}
                        value={this.state.words}
                        multiline={false}
                        autoCorrect={false}
                        autoFocus={false}
                        placeholder={'Cari...'}
                        placeholderTextColor='#DFF2FB'
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
                                this.state.words
                                ?
                                    <View style={{
                                        flexDirection: 'row'
                                    }}>
                                        <TouchableOpacity
                                            style={ styles.buttonContainer }
                                            onPress={ () => this.handleClear() }
                                        >
                                            <Image
                                                style={styles.imageActive}
                                                source={ require('../../assets/remove.png') }
                                            />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={ styles.buttonContainer }
                                            onPress={ () => this.handleSearch() }
                                        >
                                            <Image
                                                style={styles.imageActive}
                                                source={ require('../../assets/search.png') }
                                            />
                                        </TouchableOpacity>
                                    </View>
                                :
                                <View style={styles.buttonContainer}>
                                    <Image
                                        style={styles.imageDisabled}
                                        source={ require('../../assets/search.png') }
                                    />
                                </View>
                            )

                        :
                            <View style={styles.buttonContainer}>
                                <Image
                                    style={styles.imageDisabled}
                                    source={ require('../../assets/search.png') }
                                />
                            </View>
                    }
                </View>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 57,
        backgroundColor: '#2BC0FF',
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoContainer: {
        width: '10%'
    },
    logoText: {
        fontSize: 20,
        color: '#ffffff'
    },
    inputContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#6fd4ff',
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
        fontSize: 20,
        color: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#6fd4ff',
        borderRadius: 15
    },
    buttonContainer: {
        width: 35,
        color: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageDisabled: {
        width: 20,
        height: 20,
        marginRight: 5,
        opacity: 0.5
    },
    imageActive: {
        width: 20,
        height: 20,
        marginRight: 5,
    }
});

const mapStateToProps = state => {
    return {
        datas: state
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SearchHeader);