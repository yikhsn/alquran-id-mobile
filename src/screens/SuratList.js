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

import { getAllSurats } from '../controllers/SuratController';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../store/actionCreators';

import Theme, { createStyle } from 'react-native-theming';
import ThemeConstants from '../themes/navigations/ThemeConstants';
import { 
    ThemedScrollView,
    ThemedTextInput,
    ThemedTouchableHighlight,
    ThemedMaterialsIcon,
    ThemedPicker,
    ThemedPickerItem
} from '../themes/customs/components';

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

    static navigationOptions = ({ screenProps }) => {
        let currentTheme = ThemeConstants[screenProps.theme];
        
        return {
            title: 'Daftar Surat',
            headerRight: <RightHeaderSuratList />,
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
            <ThemedScrollView 
                scrollEnabled={this.state.scrollEnabled}
                keyboardShouldPersistTaps='always'
                style={styles.container}
            >
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
                <Theme.View>
                    <Modal
                        isVisible={this.props.goToSuratVisible}
                        deviceWidth={deviceWidth}
                        deviceHeight={deviceHeight} 
                        animationInTiming={500}
                        animationOutTiming={500}
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        onBackdropPress={ () => this.props.toggleGoToSuratModal() }
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
                                        }>
                                        { this.props.suratList.map((item, index) => {
                                            return (<ThemedPickerItem style={styles.inputSuratInputItem} label={item.surat_nama} value={item.id} key={item.id}/>) 
                                        })}
                                    </ThemedPicker>
                                </Theme.View>
                                <Theme.View style={styles.inputAyatContainer}>
                                    <Theme.Text style={styles.inputAyatLabel}>Ayat</Theme.Text>
                                    <ThemedTextInput
                                        style={styles.inputAyatInput}
                                        value={this.state.selectedAyatId}
                                        onChangeText={ (selectedAyatId) => this.handleCheckSelectedAyatId(selectedAyatId) }
                                        placeholder={ `1-${this.state.ayatSugest}` }
                                        placeholderTextColor='@textColorQuaternary'                                        
                                        keyboardType='numeric'                                        
                                    />
                                </Theme.View>
                            </Theme.View>
                            <Theme.View style={styles.buttonContainer}>
                                <ThemedTouchableHighlight
                                    underlayColor='@buttonColorSecondaryHighlight'
                                    onPress={ () => this.props.toggleGoToSuratModal() }
                                    style={styles.buttonClose}
                                >
                                     <ThemedMaterialsIcon
                                        style={styles.buttonText} 
                                        name='close'
                                        size={28} 
                                        color='@modalSecondaryButtonIcon'
                                    />
                                </ThemedTouchableHighlight>
                                <ThemedTouchableHighlight
                                    underlayColor='@buttonColorSecondaryHighlight'
                                    onPress={ () => this.navigateFromModal() }
                                    style={styles.buttonSubmit}
                                >
                                     <ThemedMaterialsIcon 
                                        style={styles.buttonText} 
                                        name='page-next' 
                                        size={28} 
                                        color='@modalPrimaryButtonIcon'
                                    />
                                </ThemedTouchableHighlight>
                            </Theme.View>
                        </Theme.View>
                    </Modal>
                </Theme.View>
            </ThemedScrollView>
            )
    }
}

const styles = createStyle({
    // main component
    container: {
        backgroundColor: '@backgroundColor'
    },

    // modal
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
        color: '@textColorPrimary',        
    },
    inputSuratInputItem: {
        color: '@textColorPrimary',
    },
    inputAyatInput: {
        flex: 1,
        padding: 10,
        fontSize: 16,
        borderWidth: 1,
        color: '@textColorPrimary',
        borderColor: '@borderColor'
    },
    buttonContainer: {
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
    },
    buttonClose: {
        flex: 1,
        backgroundColor: '@buttonColorSecondary',
        padding: 5,
        justifyContent: 'center',
        alignContent: 'center',
    },
    buttonSubmit: {
        flex: 2,
        backgroundColor: '@buttonColorPrimary',
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
        suratList: state.rdc.suratList,
        goToSuratVisible: state.rdc.goToSuratVisible
    }
}

const mapDisptatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDisptatchToProps)(SuratList);