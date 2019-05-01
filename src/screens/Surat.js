import React, { Component } from 'react'
import { 
    View,
    FlatList,
    Dimensions,
    Platform,
    Alert,
} from 'react-native';
import { getSingleSurat } from '../controllers/SuratController';
import HeaderSurat from '../components/HeaderSurat/HeaderSurat';
import Ayat from '../components/Ayat/Ayat';
import Bismillah from '../components/Bismillah/Bismillah';
import GoToSuratBotton from '../components/GoToSuratButton/GoToSuratButton';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../store/actionCreators';
import { addAyatToBookmark } from '../controllers/BookmarkController';
import { addToRecentReads, deleteAllFromRecentReads } from '../controllers/RecentReadsController';
import { ScrollIntoView } from 'react-native-scroll-into-view';
import Theme, { createStyle } from 'react-native-theming';
import ThemeConstants from '../themes/navigations/ThemeConstants';
import { 
    ThemedMatIcon,
    ThemedMaterialsIcon,
    ThemedTextInput,
    ThemedTouchableHighlight,
    ThemedTouchableOpacity,
    ThemedPicker,
    ThemedPickerItem,
    ThemedScrollIntoViewScrollView
} from '../themes/customs/components';
import ModalAlertBookmarkAyat from '../components/ModalAlert/ModalAlert';

class Surat extends Component{
    constructor(props){
        super(props);

        this.state = {
            // for 'GoToSurat' Modal
            selectedSuratId: 1,
            selectedAyatId: null,
            ayatSugest: 7,

            // for 'BottomModalList'
            isListModalVisible: false,

            // for 'BookmarkSurat' Alert Modal
            isBookmarkAyatVisible: true,
            bookmarkAyatStatus: '',
            bookmarkAyatDesc: ''
        }

        this.initSurat();
    }

    static navigationOptions = ({ screenProps, navigation }) => {
        let currentTheme = ThemeConstants[screenProps.theme];
        
        return {
            title: 'Surat ' + navigation.state.params.surat.surat_nama,
            headerRight: <GoToSuratBotton />,
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
        setTimeout(this.goToAyatView, 500);
    }

    // function to scroll to section ayat view based on ayatId from navigation params
    goToAyatView = () => {
        // get ayatGoToId data from navigation params
        let ayatGoToId = this.props.navigation.getParam('ayatGoToId', null);

        // get surat data from navigation params
        const surat = this.props.navigation.getParam('surat', null);

        if (!ayatGoToId) return;
        
        if (ayatGoToId === surat.ayat_total){
            ayatGoToId = ayatGoToId - 1;
        }
        
        this.scrollSectionIntoView(ayatGoToId, 'top');
    }

    // init ayat from database
    initSurat = () => {
        const surat_id = this.props.navigation.getParam('surat_id', null);

        // redux
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

        addAyatToBookmark(id)
            .then( (msg) => {
                this.handleBookmarkAyatModal(true);
                this.setBookmarkAyatStatus(msg.title);
                this.setBookmarkAyatDesc( msg.content);
            })
            .catch( (msg) => {
                this.handleBookmarkAyatModal(true);
                this.setBookmarkAyatStatus(msg.title);
                this.setBookmarkAyatDesc( msg.content);
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
    scrollSectionIntoView = (section, align) => {
        this.sectionsRefs[section].current.scrollIntoView({ align });
    };


    handleBookmarkAyatModal = 
        (isBookmarkAyatVisible) => this.setState({ isBookmarkAyatVisible });

    setBookmarkAyatStatus = 
        (bookmarkAyatStatus) => this.setState({bookmarkAyatStatus});

    setBookmarkAyatDesc = 
        (bookmarkAyatDesc) => this.setState({ bookmarkAyatDesc });
    
    
    render(){

        // create 'Refs' based on much ayat
        this.sectionsRefs = this.props.ayats.map(_section => React.createRef());

        // get surat id from navigation params to decide to show bismillah or not
        const surat_id = this.props.navigation.getParam('surat_id', null);
        
        // get surat data from navigation params to show on header surat
        const surat = this.props.navigation.getParam('surat', null);

        // get ayatGoToId data from navigation params to know that user want
        // to go to specific ayat or not
        const ayatGoToId = this.props.navigation.getParam('ayatGoToId', null);

        // get device width and height to for backdrop modal
        const deviceWidth = Dimensions.get("window").width;
        const deviceHeight = Platform.OS === "ios"
            ? Dimensions.get("window").height
            : require("react-native-extra-dimensions-android").get("REAL_WINDOW_HEIGHT");
           
        return(
            <ThemedScrollIntoViewScrollView
                keyboardShouldPersistTaps='always'
                style={styles.container}
            >
                <HeaderSurat
                    surat={surat}
                />
                {
                    // to show bismillah in all ayat except in al-fatihah(QS1) and at-taubah (QS9)
                    surat_id !== 1 ? ( surat_id !== 9 ? <Bismillah /> : null ) : null
                }

                {
                    ayatGoToId
                    ?
                        this.props.ayats.map( (item ) => (
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
                        ))
                    :
                        <FlatList
                            data={ this.props.ayats }
                            renderItem={ ({ item }) => (
                                <ScrollIntoView
                                    key={item.nomor_ayat}
                                    ref={this.sectionsRefs[item.nomor_ayat - 1 ]}
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
                            )}
                            keyExtractor={ (item, index) => item + index }
                        />
                }

                <Theme.View>
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
                        <Theme.View style={styles.modalContainer}>
                            <Theme.View style={styles.modalContent}>
                                <Theme.Text style={styles.modalHeader}>Lompat ke</Theme.Text>
                                <Theme.View style={styles.inputSurat}>
                                    <Theme.Text style={styles.inputSuratLabel}>Surat</Theme.Text>
                                    <ThemedPicker
                                        style={styles.inputSuratInput}
                                        mode='dropdown'
                                        selectedValue={this.state.selectedSuratId}
                                        onValueChange={(itemValue, indexValue) => 
                                            this.handleChangePicker(itemValue)
                                        }
                                        >
                                        {
                                            this.props.suratList.map((item, index) => {
                                                return (<ThemedPickerItem  color='@textColorPrimary' label={item.surat_nama} value={item.id} key={item.id}/>) 
                                            })
                                        }
                                    </ThemedPicker>
                                </Theme.View>
                                <Theme.View style={styles.inputAyatContainer}>
                                    <Theme.Text style={styles.inputAyatLabel}>Ayat</Theme.Text>
                                    <ThemedTextInput
                                        style={styles.inputAyatInput}
                                        value={this.state.selectedAyatId}
                                        onChangeText={ (selectedAyatId) => this.handleCheckSelectedAyatId(selectedAyatId) }
                                        placeholder={`1-${this.state.ayatSugest.toString()}`}
                                        placeholderTextColor='@textColorQuaternary'
                                        keyboardType='numeric'
                                    />
                                </Theme.View>
                            </Theme.View>
                            <Theme.View style={styles.buttonContainer}>
                                <ThemedTouchableHighlight
                                    onPress={ () => this.props.toggleGoToAyatModal() }
                                    style={styles.buttonClose}
                                    underlayColor='@buttonColorSecondaryHighlight'
                                >
                                     <ThemedMaterialsIcon 
                                        style={styles.buttonText} 
                                        name='close' size={28} 
                                        color='@modalSecondaryButtonIcon' 
                                     />
                                </ThemedTouchableHighlight>
                                <ThemedTouchableHighlight
                                    onPress={ () => this.navigateFromModal() }
                                    style={styles.buttonSubmit}
                                    underlayColor='@buttonColorPrimaryHighlight'
                                >
                                     <ThemedMaterialsIcon 
                                        style={styles.buttonText} 
                                        name='page-next' size={28} 
                                        color='@modalPrimaryButtonIcon' 
                                    />
                                </ThemedTouchableHighlight>
                            </Theme.View>
                        </Theme.View>
                    </Modal>
                </Theme.View>

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
                        <Theme.View style={styles.modalListContainer}>
                            <Theme.View style={styles.modalListHeader} >
                                <Theme.Text style={styles.modalListTitle}>
                                    { 
                                        this.props.selectedAyat 
                                        ? 
                                            'QS. ' + this.props.selectedAyat.surat_nama+':Ayat '+this.props.selectedAyat.nomor_ayat 
                                        : 
                                            'loading'
                                    }
                                </Theme.Text>
                            </Theme.View>
                            <Theme.View style={styles.modalListContent}>
                                <ThemedTouchableOpacity 
                                    onPress={ () => 
                                        this.addToBookmark(this.props.selectedAyat.id) 
                                    } 
                                    style={styles.modalListButton}
                                >
                                    <ThemedMatIcon 
                                        name='library-add' size={28} color='@textColorArab'
                                        style={styles.modalListButtonIcon}
                                    />
                                    <Theme.Text style={styles.modalListButtonText}>Tambah ke bookmark</Theme.Text>
                                </ThemedTouchableOpacity>
                                <ThemedTouchableOpacity
                                    onPress={ () => this.addToRecent(this.props.selectedAyat.id) } 
                                    style={styles.modalListButton}
                                >
                                    <ThemedMatIcon 
                                        name='access-time' size={28} color='@textColorArab'
                                        style={styles.modalListButtonIcon}
                                    />
                                    <Theme.Text style={styles.modalListButtonText}>Tandai terakhir dibaca</Theme.Text>
                                </ThemedTouchableOpacity>
                                <ThemedTouchableOpacity
                                    onPress={ () => this.toggleListModal() } 
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

                <ModalAlertBookmarkAyat
                    isVisible={this.state.isBookmarkAyatVisible}
                    status={this.state.bookmarkAyatStatus}
                    desc={this.state.bookmarkAyatDesc}
                    handleBookmarkModal={this.handleBookmarkAyatModal}
                />
            </ThemedScrollIntoViewScrollView>
        )
    }
}

const styles = createStyle({
    container: {
        backgroundColor: '@backgroundColor'
    },


    modalContainer: {
        height: ( Dimensions.get("window").width  * 90 / 100 ) * 60 / 100,
        width: '90%',
        backgroundColor: '@backgroundColor',
    },
    modalContent: {
        flex: 1,
        margin: 0,
        paddingVertical: 10,
        paddingHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '@backgroundColor',
    },
    modalHeader: {
        fontSize: 20,
        marginBottom: 5,
        fontWeight: '500',
        fontFamily: 'Roboto-Regular',
        color: '@textColorArab'
    },
    inputAyatContainer:{
        flex: 1,
        color: '@textColorPrimary',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputSurat: {
        flex: 1,
        color: '@textColorPrimary',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputAyatLabel: {
        color: '@textColorPrimary',
        fontSize: 16,
        width: '20%'
    },
    inputSuratLabel: {
        color: '@textColorPrimary',
        fontSize: 16,
        width: '20%'
    },
    inputSuratInput: {
        flex: 1,
        // to make color of arrow in item picker same as its text
        // backgroundColor: '@backgroundColor',
        color: '@textColorPrimary',
    },
    inputAyatInput: {
        flex: 1,
        color: '@textColorPrimary',
        padding: 10,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '@borderColor'
    },
    buttonContainer: {
        margin: 0,
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
    },
    buttonClose: {
        flex: 1,
        backgroundColor: '@buttonColorSecondary',
        padding: 5,
        margin: 0,
        justifyContent: 'center',
        alignContent: 'center',
    },
    buttonSubmit: {
        flex: 2,
        backgroundColor: '@buttonColorPrimary',
        padding: 5,
        margin: 0,
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

const mapStateToProps = state => {
    return {
        suratList: state.rdc.suratList,
        goToAyatVisible: state.rdc.goToAyatVisible,
        selectedAyat: state.rdc.selectedAyat,
        ayats: state.rdc.ayats
    }
}

const mapDisptatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDisptatchToProps)(Surat);