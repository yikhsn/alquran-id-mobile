import React, { Component } from 'react';
import { 
    View,
    Text, 
    TextInput,
    TouchableOpacity,
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
    }

    handleWordChange = (words) => this.setState({ words });

    handleSearch = () => {
        this.props.setSearchMode();

        this.props.setSearchResult([]);

        if (this.state.words.trim()) this.searchAyat(this.state.words);
    }

    handleClear = () => {
        this.setState({ words: '' });

        this.props.removeSearchMode();
    }

    searchAyat = (query) => {
        searchAyat(query).then( (ayats) => {
            this.props.setSearchResult(ayats);

            this.props.removeSearchMode();
        });
    }

    render(){
        return(
            <View style={styles.container}>
                {/* <View style={styles.logoContainer}>
                    <Text style={styles.logoText}>Cari</Text>
                </View> */}
                <View style={styles.inputContainer}>
                        <TextInput 
                            style={styles.input}
                            value={this.state.words}
                            multiline={false}
                            autoCorrect={false}
                            autoFocus={false}
                            placeholder={'Cari...'}
                            placeholderTextColor='#ffffff'
                            onChangeText={(words) => this.handleWordChange(words) }
                            // onFocus={}
                            underlineColorAndroid='transparent'
                        />
                        <TouchableOpacity
                            style={ styles.clearButton }
                            onPress={ () => this.handleClear() }
                        >
                            <Text>Clear</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={ styles.clearButton }
                            onPress={ () => this.handleSearch() }
                        >
                            <Text>Cari</Text>
                        </TouchableOpacity>
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
        paddingHorizontal: 10,
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
    clearButton: {
        width: 35,
        color: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

const mapStateToProps = state => {
    return {
        datas: state
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SearchHeader);