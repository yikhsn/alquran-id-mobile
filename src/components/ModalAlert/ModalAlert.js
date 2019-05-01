import React, { Component } from 'react';
import { Dimensions, Platform, Text } from 'react-native';
import { 
    ThemedMatIcon,
    ThemedMaterialsIcon,
    ThemedTouchableHighlight,
    ThemedTouchableOpacity,
} from '../../themes/customs/components';
import Theme, { createStyle } from 'react-native-theming';
import Modal from 'react-native-modal';

class ModalAlert extends Component {    
    render(){

        const deviceWidth = Dimensions.get("window").width;
        const deviceHeight = Platform.OS === "ios"
            ? Dimensions.get("window").height
            : require("react-native-extra-dimensions-android").get("REAL_WINDOW_HEIGHT");

        return (
            <Theme.View>
                <Modal
                    isVisible={this.props.isVisible}
                    deviceWidth={deviceWidth}
                    deviceHeight={deviceHeight}
                    animationInTiming={500}
                    animationOutTiming={500}
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onBackdropPress={ () => this.props.handleBookmarkModal(false) }
                >
                    <Theme.View style={styles.modalContainer}>
                        <Theme.View style={styles.modalContent}>
                            {
                                this.props.status === 'Berhasil!'
                                ?
                                    <ThemedMaterialsIcon 
                                        style={styles.iconStatus}
                                        name='checkbox-marked-circle-outline'
                                        size={50} 
                                        color='@textColorArabPrimary' 
                                    />
                                :
                                    <ThemedMaterialsIcon 
                                        style={styles.iconStatus}
                                        name='alert-circle-outline'
                                        size={50} 
                                        color='@textColorArabPrimary' 
                                    />
                            }
                            <Theme.Text style={styles.modalHeader}>
                                {this.props.status}
                            </Theme.Text>
                            <Theme.Text style={styles.modalDesc}>
                                {this.props.desc}
                            </Theme.Text>
                        </Theme.View>
                        <ThemedTouchableHighlight
                            onPress={ () => this.props.handleBookmarkModal(false) }
                            style={styles.buttonContainer}
                            underlayColor='@buttonColorPrimaryHighlight'
                        >
                            <Theme.Text style={styles.buttonText}>
                                OK
                            </Theme.Text>
                        </ThemedTouchableHighlight>
                    </Theme.View>

                </Modal>
            </Theme.View>
        )
    }
}

const styles = createStyle({
    modalContainer: {
        height: ( Dimensions.get("window").width  * 90 / 100 ) * 55 / 100,
        width: '95%',
        backgroundColor: '@backgroundColor',
    },
    modalContent: {
        height: '80%',
        padding: 20,
        alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: '@backgroundColor',
    },
    iconStatus: {
        marginBottom: 5,
    },
    modalHeader: {
        fontSize: 20,
        marginBottom: 10,
        fontFamily: 'Roboto-Regular',
        color: '@textColorArab'
    },
    modalDesc: {
        fontSize: 16,
        marginBottom: 5,
        fontFamily: 'Roboto-Regular',
        color: '@textColorArab'
    },
    buttonContainer: {
        height: '20%',
        backgroundColor: '@buttonColorPrimary',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 16,
        fontFamily: 'Roboto-Regular',
        color: '@textColorArabLight'
    }
})

export default ModalAlert;