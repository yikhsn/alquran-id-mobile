import React, { Component } from 'react';
import { 
    ScrollView,
    TouchableOpacity,
    TouchableHighlight,
    View,
    Dimensions,
    Platform,
    Text,
    Picker,
    TextInput,
    StyleSheet,
    FlatList 
} from 'react-native';
import Modal from 'react-native-modal';
import List from '../components/Surat/List';
import RightHeaderSuratList from '../components/RightHeaderSuratList/RightHeaderSuratList';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { getAllSurats } from '../controllers/SuratController';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../store/actionCreators';

class SuratList extends Component{
    constructor(props){
        super(props);

        this.state = {
            scrollEnabled: true,
            
            selectedSuratId: 1,
            selectedAyatId: null,
            ayatSugest: 7,
        }        

        this.initListSurats();
    }

    static navigationOptions = ({ navigation }) => ({
        title: 'Daftar Surat',
        headerRight: <RightHeaderSuratList />
    })

    // function to init all surat list from the database
    initListSurats = () => {
        getAllSurats().then( (surats) => this.props.setSuratList(surats));
    }

    allowScroll = (scrollEnabled) => {
        this.setState({ scrollEnabled });
    }

    navigateFromModal = () => {
        // toggle, in this case will close the modal
        this.props.toggleGoToSuratModal();

        // select the surat data from redux state 'suratList' based on state 'selectedSuratId'
        const surat = this.props.suratList.find( surat => surat.id === this.state.selectedSuratId );

        // navigate from the modal
        this.props.navigation.navigate('Surat', {
            surat: surat,
            surat_id: surat.id,
            ayatGoToId: this.state.selectedAyatId
        });
    }

    // function to handle state 'ayasSugest' to the curent surat selected
    handleAyatSugestModal = (suratId) => {
        const lastSugest = this.props.suratList.find( surat => surat.id === suratId);

        const lastSugestString = lastSugest.ayat_total;
        this.setState({ ayatSugest: lastSugestString });
    }

    // function to handle and check input user input to state 'selectedAyatId'
    handleCheckSelectedAyatId = (selectedAyatId) => {
        if ( selectedAyatId > this.state.ayatSugest) return;
        else this.setState({ selectedAyatId });
    }

    // function to handle surat that user changed on modal picker
    handleChangePicker = (itemValue) => {
        
        // change state 'selectedSuratId' to the current value
        this.setState({ selectedSuratId: itemValue  });

        // change state 'selectedAyatId' to null everytime user change picker
        this.setState({ selectedAyatId: null });

        // change ayat sugest on modal to  curent range of ayats
        this.handleAyatSugestModal(itemValue);
    }
    
    render() {
        const deviceWidth = Dimensions.get("window").width;
        const deviceHeight = Platform.OS === "ios"
            ? Dimensions.get("window").height
            : require("react-native-extra-dimensions-android").get("REAL_WINDOW_HEIGHT");

        return(
            <ScrollView scrollEnabled={this.state.scrollEnabled} >
                <FlatList
                    data={ this.props.suratList }
                    renderItem={ ({ item }) => {
                        return <List
                            surat={item}
                            navigation={this.props.navigation}
                            allowScroll={this.allowScroll}
                        />
                    } }
                    keyExtractor={ (item, index) => item + index }
                />
                <View>
                    <Modal 
                        isVisible={this.props.goToSuratVisible}
                        deviceWidth={deviceWidth}
                        deviceHeight={deviceHeight} 
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        onBackdropPress={ () => this.props.toggleGoToSuratModal() }
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalHeader}>Lompat ke</Text>
                                <View style={styles.inputSurat}>
                                    <Text style={styles.inputSuratLabel}>Surat</Text>
                                    <Picker
                                        style={styles.inputSuratInput}
                                        mode='dropdown'
                                        selectedValue={this.state.selectedSuratId}
                                        onValueChange={(itemValue, indexValue) => 
                                            this.handleChangePicker(itemValue)
                                        }>
                                        { this.props.suratList.map((item, index) => {
                                            return (<Picker.Item label={item.surat_nama} value={item.id} key={item.id}/>) 
                                        })}
                                    </Picker>
                                </View>
                                <View style={styles.inputAyatContainer}>
                                    <Text style={styles.inputAyatLabel}>Ayat</Text>
                                    <TextInput
                                        style={styles.inputAyatInput}
                                        value={this.state.selectedAyatId}
                                        onChangeText={ (selectedAyatId) => this.handleCheckSelectedAyatId(selectedAyatId) }
                                        placeholder={ `1-${this.state.ayatSugest}` }
                                    />
                                </View>
                            </View>
                            <View style={styles.buttonContainer}>
                                <TouchableHighlight
                                    onPress={ () => this.props.toggleGoToSuratModal() }
                                    style={styles.buttonClose}
                                >
                                     <Icon style={styles.buttonText} name='close' size={28} color='#ffffff' />
                                </TouchableHighlight>
                                <TouchableHighlight
                                    onPress={ () => this.navigateFromModal() }
                                    style={styles.buttonSubmit}
                                >
                                     <Icon style={styles.buttonText} name='page-next' size={28} color='#ffffff' />
                                </TouchableHighlight>
                            </View>
                        </View>
                    </Modal>
                </View>
            </ScrollView>
            )
    }
}

const styles = StyleSheet.create({
    modalContainer: {
        height: ( Dimensions.get("window").width  * 90 / 100 ) * 60 / 100,
        width: '90%',
    },
    modalContent: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
    },
    modalHeader: {
        fontSize: 20,
        marginBottom: 5,
        fontWeight: '500',
        fontFamily: 'Roboto-Regular',
        color: '#444444'
    },
    inputAyatContainer:{
        flex: 1,
        color: '#444444',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputSurat: {
        flex: 1,
        color: '#444444',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputAyatLabel: {
        color: '#444444',
        fontSize: 16,
        width: '20%'
    },
    inputSuratLabel: {
        color: '#444444',
        fontSize: 16,
        width: '20%'
    },
    inputSuratInput: {
        flex: 1
    },
    inputAyatInput: {
        flex: 1,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#eaeaea'
    },
    buttonContainer: {
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
    },
    buttonClose: {
        flex: 1,
        backgroundColor: '#5ecfff',
        padding: 5,
        justifyContent: 'center',
        alignContent: 'center',
    },
    buttonSubmit: {
        flex: 2,
        backgroundColor: '#2bc0ff',
        padding: 5,
        justifyContent: 'center',
        alignContent: 'center',
    },
    buttonText : {
        alignContent: 'center',
        alignSelf: 'center'
    }
})

const mapStateToProps = state => {
    return {
        suratList: state.suratList,
        goToSuratVisible: state.goToSuratVisible
    }
}

const mapDisptatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDisptatchToProps)(SuratList);