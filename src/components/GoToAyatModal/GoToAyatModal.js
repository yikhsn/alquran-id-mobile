import React, { Component } from 'react';
import {
    Dimensions,
    Platform
} from 'react-native';
import { 
    ThemedMaterialsIcon,
    ThemedTextInput,
    ThemedTouchableHighlight,
    ThemedPicker,
    ThemedPickerItem,
} from '../../themes/customs/components';
import Theme, { createStyle } from 'react-native-theming';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../store/actionCreators';

class GoToAyatModal extends Component{
    state = {
        // for 'GoToSurat' Modal
        selectedAyatId: null,
    }

    handleGoToAyat = (ayatNumber) => {
        this.props.toggleGoToAyatModal();

        this.props.scrollIntoAyat(ayatNumber)
    }

    // function to handle and check input user input to state 'selectedAyatId'
    handleCheckSelectedAyatId = (selectedAyatId) => {
        
        // validation to ignore user to input the bigger number of the total ayat
        if ( selectedAyatId > this.props.ayat_total) return;
        else this.setState({ selectedAyatId });
    }
    
    render(){
        const deviceWidth = Dimensions.get("window").width;
        const deviceHeight = Platform.OS === "ios"
            ? Dimensions.get("window").height
            : require("react-native-extra-dimensions-android").get("REAL_WINDOW_HEIGHT");

        return(
            <Theme.View>
                <Modal
                    isVisible={this.props.goToAyatVisible}
                    deviceWidth={deviceWidth}
                    deviceHeight={deviceHeight}
                    animationInTiming={100}
                    animationOutTiming={100}
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onBackdropPress={ () => this.props.toggleGoToAyatModal() }
                >
                    <Theme.View style={styles.modalContainer}>
                        <Theme.View style={styles.modalContent}>
                            <Theme.Text style={styles.modalHeader}>Lompat ke Ayat</Theme.Text>
                            <Theme.View style={styles.inputAyatContainer}>
                                <Theme.Text style={styles.inputAyatLabel}>Ayat</Theme.Text>
                                <ThemedTextInput
                                    style={styles.inputAyatInput}
                                    value={this.state.selectedAyatId}
                                    onChangeText={ (selectedAyatId) => this.handleCheckSelectedAyatId(selectedAyatId) }
                                    placeholder={`1-${this.props.ayat_total.toString()}`}
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
                                onPress={ () => this.handleGoToAyat(this.state.selectedAyatId) }
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
        )
    }
}

const styles = createStyle({
    // style for 'GoToSurat' Modal
    modalContainer: {
        height: ( Dimensions.get("window").width  * 90 / 100 ) * 45 / 100,
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
});

const mapStateToProps = state => {
    return {
        goToAyatVisible: state.rdc.goToAyatVisible,
        suratList: state.rdc.suratList,
    }
}

const mapDisptatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDisptatchToProps)(GoToAyatModal);