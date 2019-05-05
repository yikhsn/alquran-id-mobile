import React, { Component } from 'react'
import { 
    View,
    FlatList,
    Dimensions,
    Platform,
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
    ThemedTouchableOpacity,
    ThemedScrollIntoViewScrollView,
} from '../themes/customs/components';
import ModalAlertBookmarkAyat from '../components/ModalAlert/ModalAlert';
import ModalAlertRecentAyat from '../components/ModalAlert/ModalAlert';
import Loader from '../components/Loader/Loader';
import GoToAyatModal from '../components/GoToAyatModal/GoToAyatModal';

class Surat extends Component{
    constructor(props){
        super(props);

        this.state = {
            // to show loading spinner when content is loading
            isInRendering: true,

            // for 'BottomModalList'
            isListModalVisible: false,

            // for 'BookmarkSurat' Alert Modal
            isBookmarkAyatVisible: false,
            bookmarkAyatStatus: '',
            bookmarkAyatDesc: '',

            // for 'TagRecentRead' Modal
            isRecentReadVisible: false,
            recentReadStatus: '',
            recentReadDesc: '',
        }

        // Fires while transition is happening
        props.navigation.addListener('willFocus', () => {
            this.setState({ isInRendering: true });
        });
    
        // Fires after transition is complete
        props.navigation.addListener('didFocus', () => {
            this.setState({ isInRendering: false });
        });

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
        setTimeout(this.countAyatToScroll, 500);
    }

    // function to scroll to count is it going to scroll to ayat or not based on the given params
    countAyatToScroll = () => {
        // get ayatGoToId data from navigation params
        let ayatGoToId = this.props.navigation.getParam('ayatGoToId', null);

        if (!ayatGoToId) return;
        
        this.scrollIntoAyat(ayatGoToId);
    }

    // function to count where to scroll
    scrollIntoAyat = (ayatNumber) => {
        // get surat data from navigation params
        const surat = this.props.navigation.getParam('surat', null);

        if (ayatNumber == surat.ayat_total){
            ayatNumber = ayatNumber - 1;
        }

        this.scrollSectionIntoView(ayatNumber, 'top');
    }

    // init ayat from database
    initSurat = () => {
        const surat_id = this.props.navigation.getParam('surat_id', null);

        // redux
        getSingleSurat(surat_id).then( (ayats) => this.props.setAyats(ayats));
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
            addToRecentReads(id)
                .then( (msg) => {
                    this.handleRecentReadModal(true);
                    this.setRecentReadStatus(msg.title);
                    this.setRecentReadDesc( msg.content);
            })
        })
    }

    // function scroll to scroll into ayat section/view based on the ayat that pressed
    scrollSectionIntoView = (section, align) => {
        this.sectionsRefs[section].current.scrollIntoView({ align });
    };

    // function to set state to any change on Bookmark Ayat Modal
    handleBookmarkAyatModal = 
        (isBookmarkAyatVisible) => this.setState({ isBookmarkAyatVisible });

    setBookmarkAyatStatus = 
        (bookmarkAyatStatus) => this.setState({bookmarkAyatStatus});

    setBookmarkAyatDesc = 
        (bookmarkAyatDesc) => this.setState({ bookmarkAyatDesc });
    
    // function to set state to any change on Bookmark Ayat Modal
    handleRecentReadModal = 
        (isRecentReadVisible) => this.setState({ isRecentReadVisible });

    setRecentReadStatus = 
        (recentReadStatus) => this.setState({recentReadStatus});

    setRecentReadDesc = 
        (recentReadDesc) => this.setState({ recentReadDesc });
    
    render(){

        // create 'Refs' based on much ayat
        // this.sectionsRefs = this.props.ayats.map(_section => React.createRef());
        this.sectionsRefs = this.props.ayats.map(_section => React.createRef());

        console.log(this.sectionsRefs);

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

        // to show bismillah in all ayat except in al-fatihah(QS1) and at-taubah (QS9)        
        const renderBismillah = surat_id !== 1 ? ( surat_id !== 9 ? <Bismillah /> : null ) : null;

        // to render each ayat of surat
        const renderAyat = 
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
   
        return(
            <ThemedScrollIntoViewScrollView
                keyboardShouldPersistTaps='always'
                style={styles.container}
                contentContainerStyle={{ flexGrow: 1 }}
            >
                {
                    this.state.isInRendering
                    ? <Loader />
                    :
                        <View>
                            <HeaderSurat
                                surat={surat}
                            />

                            { renderBismillah }
            
                            { renderAyat }
            
                            <GoToAyatModal
                                scrollIntoAyat={this.scrollIntoAyat}
                                ayat_total={surat.ayat_total}
                            />
            
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
            
                            <ModalAlertRecentAyat
                                isVisible={this.state.isRecentReadVisible}
                                status={this.state.recentReadStatus}
                                desc={this.state.recentReadDesc}
                                handleBookmarkModal={this.handleRecentReadModal}
                            />
                        </View>
                }
            </ThemedScrollIntoViewScrollView>
        )
    }
}

const styles = createStyle({
    container: {
        backgroundColor: '@backgroundColor',
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
        selectedAyat: state.rdc.selectedAyat,
        ayats: state.rdc.ayats
    }
}

const mapDisptatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDisptatchToProps)(Surat);