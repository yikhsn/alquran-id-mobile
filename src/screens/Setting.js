import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Text,
    TouchableHighlight,
    StyleSheet
} from 'react-native';
import Theme, { createStyle } from 'react-native-theming';
import { darkThemes, lightThemes } from '../themes/themes';
import { 
    ThemedSwitch,
    ThemedMaterialsIcon,
    Bar,
    ThemedScrollView
} from '../themes/customs/components';
import ThemeConstants from '../themes/navigations/ThemeConstants';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../store/actionCreators';

class Setting extends Component{

    constructor(props){
        super(props);

        if (this.props.darkMode) this.darkThemeApply();
        else this.lightThemeApply();
    }

    static navigationOptions = ({ screenProps }) => {
        let currentTheme = ThemeConstants[screenProps.theme];
        
        return {
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

    handleThemeApply = (value) => {
        this.props.changeTheme(value)
        if (value) this.darkThemeApply();
        else this.lightThemeApply();
    }

    darkThemeApply = () => {
        darkThemes.apply();
        this.props.screenProps.dark();
    }

    lightThemeApply = () => {
        lightThemes.apply();
        this.props.screenProps.light();
    }

    render(){
        return(
            <ThemedScrollView style={styles.screen}>
                <Bar barStyle="@statusBar" backgroundColor="@statusBarBackground" />
                <Theme.View style={styles.container} >
                    <Theme.View style={styles.item}>
                        <Theme.Text style={styles.itemText}>
                            Dark Mode
                        </Theme.Text>
                        <ThemedSwitch
                            disabled={false}
                            onValueChange={ (value) => this.handleThemeApply(value) }
                            trackColor={ {false: '#aaaaaa', true: '#888888'} }
                            thumbColor='@thumbColorSwitch'
                            value={this.props.darkMode}
                        />
                    </Theme.View>
                    <Theme.View style={styles.item}>
                        <Theme.Text style={styles.itemText}>
                            Pengembang
                        </Theme.Text>
                        <ThemedMaterialsIcon style={styles.image} name="web" size={25} color="@textColorTertiary"/>
                    </Theme.View>
                    <Theme.View style={styles.item}>
                        <Theme.Text style={styles.itemText}>
                            Feedback
                        </Theme.Text>
                        <ThemedMaterialsIcon style={styles.image} name="star" size={25} color="@textColorTertiary"/>
                    </Theme.View>
                </Theme.View>
            </ThemedScrollView>
        )
    }
}

const styles = createStyle({
    screen: {
        flex: 1,
        paddingVertical: 5,
        backgroundColor: '@containerColor',
    },
    container: {
        flex: 1,
        paddingHorizontal: 10,
    },
    item: {
        backgroundColor: '@boxColor',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 10,
        marginVertical: 5,
        borderRadius: 5,
        flexDirection: 'row',
    },
    itemText: {
        fontSize: 16,
        fontFamily: 'Roboto-Regular',
        color: '@textColorPrimary',
    },
})

const mapStateToProps = state => {
    return {
        darkMode: state.theme.darkMode
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Setting);