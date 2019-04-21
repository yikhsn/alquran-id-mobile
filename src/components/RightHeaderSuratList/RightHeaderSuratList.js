import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../store/actionCreators';
import Theme, { createStyle } from 'react-native-theming';
import { 
    ThemedMaterialsIcon,
    ThemedFontAwesome,
    ThemedTouchableOpacity
 } from '../../themes/customs/components';

class RightHeaderSuratList extends Component{
    render(){
        return(
            <Theme.View style={styles.right}>
                <ThemedTouchableOpacity
                    style={styles.reverseButton}
                    onPress={ () =>  this.props.reverseSuratList() }
                >
                    <ThemedFontAwesome
                        style={styles.image} 
                        name="exchange" 
                        size={20} 
                        color="@textColorArabLight"
                    />
                </ThemedTouchableOpacity>
                <ThemedTouchableOpacity
                    style={styles.goToButton}
                    onPress={ () => this.props.toggleGoToSuratModal() }
                >
                    <ThemedMaterialsIcon 
                        style={styles.gotoIcon} 
                        name="page-next-outline" 
                        size={25} 
                        color="@textColorArabLight"
                    />
                </ThemedTouchableOpacity>
            </Theme.View>
        )
    }
}

const styles = createStyle({
    right: {
        marginRight: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    goToButton : {
        alignItems: 'center',
        justifyContent: 'center',
    },
    reverseButton: {
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    gotoIcon: {
    },
    image: {
        transform: [{ rotate: '90deg' }]
    }
})

const mapStateToProps = state => {
    return {
        suratList: state.rdc.suratList,
        goToSuratVisible: state.rdc.goToSuratVisible
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default  connect(mapStateToProps, mapDispatchToProps)(RightHeaderSuratList);