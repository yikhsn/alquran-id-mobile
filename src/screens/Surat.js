import React, { Component } from 'react'
import { 
    View,
    ScrollView,
    FlatList,
    Dimensions,
    Platform,
    Picker,
    Text,
    TouchableHighlight,
    TouchableOpacity,
    TextInput,
    Alert,
    StyleSheet
} from 'react-native';
import { getSingleSurat } from '../controllers/SuratController';
import HeaderSurat from '../components/HeaderSurat/HeaderSurat';
import Ayat from '../components/Ayat/Ayat';
import Bismillah from '../components/Bismillah/Bismillah';
import GoToSuratBotton from '../components/GoToSuratButton/GoToSuratButton';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../store/actionCreators';
import { addAyatToBookmark } from '../controllers/BookmarkController';
import { addToRecentReads, deleteAllFromRecentReads } from '../controllers/RecentReadsController';

import { ScrollIntoView, wrapScrollViewConfigured } from 'react-native-scroll-into-view';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// create wrapScrollViewConfigured for scroll into some ayat section
const ScrollIntoViewScrollView = wrapScrollViewConfigured({
    refPropName: 'innerRef'
})(KeyboardAwareScrollView);

class Surat extends Component{
    constructor(props){
        super(props);

        this.state = {
            selectedSuratId: 1,
            selectedAyatId: null,
            ayatSugest: 7,

            isListModalVisible: false
        }

        this.initSurat();
    }

    static navigationOptions = ({ navigation }) => ({
        title: 'Surat ' + navigation.state.params.surat.surat_nama,
        headerRight: <GoToSuratBotton />
    })

    componentDidMount() {
        setTimeout(this.goToAyatView, 4000);
    }

    // function to scroll to section ayat view based on ayatId from navigation params
    goToAyatView = () => {
        const ayatGoToId = this.props.navigation.getParam('ayatGoToId', null);

        if (ayatGoToId) {
            this.scrollSectionIntoView(ayatGoToId);
        }
    }

    // init ayat from database
    initSurat = () => {
        const surat_id = this.props.navigation.getParam('surat_id', null);
        getSingleSurat(surat_id).then( (ayats) => this.props.setAyats(ayats));
    }

    // function to handle surat that user changed on modal picker 
    handleChangePicker = (itemValue) => {

        // change state 'selectedSuratId' to curent selected itemValue on picker
        this.setState({ selectedSuratId: itemValue  });

        // change state 'selectedAyatId' to null everytime user change picker
        this.setState({ selectedAyatId: null });

        // change ayat sugest on modal to  curent range of ayats
        this.handleAyatSugestModal(itemValue);
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

    // function to navigate from modal
    navigateFromModal = () => {

        // toggle, in this case will close the modal
        this.props.toggleGoToAyatModal();

        // select the surat data from redux state 'suratList' based on state 'selectedSuratId'
        const surat = this.props.suratList.find( surat => surat.id === this.state.selectedSuratId );

        // navigate from the modal
        this.props.navigation.push('Surat', {
            surat: surat,
            surat_id: surat.id,
            ayatGoToId: this.state.selectedAyatId
        });
    }

    // function to toggle visibilty on the modal
    toggleListModal = () => {
        this.setState({ isListModalVisible: !this.state.isListModalVisible });
    }

    // function to handle state 'selectedAyat' to show on modal when ayat clicked
    selectAyat = (selectedAyat) => this.props.selectAyat(selectedAyat);

    // function to handle when ayat clicked on pressed
    handleAyatPressed = (ayat) => {
        this.toggleListModal();

        this.selectAyat(ayat);
    }

    // function to handle button add ayat bookmark to database on modal
    addToBookmark = (id) => {
        this.toggleListModal();

        addAyatToBookmark(id).then( (msg) => {
            Alert.alert(
                msg.title,
                msg.content,
                [
                    {
                        text: 'OK',
                        onPress: () => this.props.navigation.navigate('Surat')
                    },
                ],
                { cancelable: false }
            );
        })
    }

    // function to handle button add ayat to recent read to database on modal
    addToRecent = (id) => {
        this.toggleListModal();

        deleteAllFromRecentReads().then( (mes) => {
            addToRecentReads(id).then( (msg) => {
                Alert.alert(
                    msg.title,
                    msg.content,
                    [
                        {
                            text: 'OK',
                            onPress: () => this.props.navigation.navigate('Surat')
                        },
                    ],
                    { cancelable: false }
                );
            })
        })
    }

    // function scroll to scroll into ayat section/view based on the ayat that pressed
    scrollSectionIntoView = (section) => {
        this.sectionsRefs[section].current.scrollIntoView({ align: 'top' });
    };
    
    
    render(){
        // create ref to each ayat
        this.sectionsRefs = this.props.ayats.map(_section => React.createRef());

        // get surat id from navigation params to decide to show bismillah or not
        const surat_id = this.props.navigation.getParam('surat_id', null);
        
        // get surat data from navigation params to show on header surat
        const surat = this.props.navigation.getParam('surat', null);

        // get device width and height to for backdrop modal
        const deviceWidth = Dimensions.get("window").width;
        const deviceHeight = Platform.OS === "ios"
            ? Dimensions.get("window").height
            : require("react-native-extra-dimensions-android").get("REAL_WINDOW_HEIGHT");
           
        return(
            <ScrollIntoViewScrollView>
                <HeaderSurat
                    surat={surat}
                />
                {
                    surat_id !== 1 ? ( surat_id !== 9 ? <Bismillah /> : null ) : null
                }
                <FlatList
                    data={ this.props.ayats }
                    renderItem={ ({ item }) => {
                        return (
                            <ScrollIntoView
                                key={item.nomor_ayat}
                                ref={this.sectionsRefs[item.nomor_ayat]}
                                onMount={false}
                                onUpdate
                            >
                                <Ayat
                                    ayat={item}
                                    navigation={this.props.navigation}
                                    handleAyatPressed={this.handleAyatPressed}
                                    addToBookmark={this.addToBookmark}
                                />  
                            </ScrollIntoView>
                        )
    
                    }}
                    keyExtractor={ (item, index) => item + index }
                />

                <View>
                    <Modal 
                        isVisible={this.props.goToAyatVisible}
                        deviceWidth={deviceWidth}
                        deviceHeight={deviceHeight}
                        animationInTiming={500}
                        animationOutTiming={500}
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        onBackdropPress={ () => this.props.toggleGoToAyatModal() }
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
                                        placeholder={`1-${this.state.ayatSugest.toString()}`}
                                    />
                                </View>
                            </View>
                            <View style={styles.buttonContainer}>
                                <TouchableHighlight
                                    onPress={ () => this.props.toggleGoToAyatModal() }
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


                <View>
                    <Modal 
                        isVisible={this.state.isListModalVisible}
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
                        onBackdropPress={ () => this.toggleListModal() }
                    >
                        <View style={styles.modalListContainer}>
                            <View style={styles.modalListHeader} >
                                <Text style={styles.modalListTitle}>
                                    { 
                                        this.props.selectedAyat 
                                        ? 
                                            'QS. '+this.props.selectedAyat.surat_nama+':Ayat '+this.props.selectedAyat.nomor_ayat 
                                        : 
                                            'loading'
                                    }
                                </Text>
                            </View>
                            <View style={styles.modalListContent}>
                                <TouchableOpacity 
                                    onPress={ () => 
                                        this.addToBookmark(this.props.selectedAyat.id) 
                                    } 
                                    style={styles.modalListButton}
                                >
                                    <MaterialIcon 
                                        name='library-add' size={28} color='#444444'
                                        style={styles.modalListButtonIcon}
                                    />
                                    <Text style={styles.modalListButtonText}>Tambah ke bookmark</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={ () => this.addToRecent(this.props.selectedAyat.id) } 
                                    style={styles.modalListButton}
                                >
                                    <MaterialIcon 
                                        name='access-time' size={28} color='#444444'
                                        style={styles.modalListButtonIcon}
                                    />
                                    <Text style={styles.modalListButtonText}>Tandai terakhir dibaca</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={ () => this.toggleListModal() } 
                                    style={styles.modalListButton}
                                >
                                    <MaterialIcon 
                                        name='close' size={28} color='#444444'
                                        style={styles.modalListButtonIcon}
                                    />
                                    <Text style={styles.modalListButtonText}>Keluar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>
            </ScrollIntoViewScrollView>
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
    },


    // style for modal list
    modalListContainer: {
        width: '100%',
        backgroundColor: '#FFFFFF',
    },
    modalListHeader: {
        padding: 20
    },
    modalListTitle: {
        fontSize: 17,
        fontWeight: '500',
        alignSelf: 'center',
        fontFamily: 'Roboto-Regular',
        color: '#444444'
    },
    modalListContent: {
        alignItems: 'center',
        justifyContent: 'center',
    }, 
    modalListButton: {
        padding: 15,
        width: '100%',
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    modalListButtonIcon: {
        marginRight: 5,
    },
    modalListButtonText: {
        color: '#444444',
        fontFamily: 'Roboto-Regular',
        fontSize: 16
    }
})

const mapStateToProps = state => {
    return {
        suratList: state.suratList,
        goToAyatVisible: state.goToAyatVisible,
        selectedAyat: state.selectedAyat,
        ayats: state.ayats
    }
}

const mapDisptatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDisptatchToProps)(Surat);