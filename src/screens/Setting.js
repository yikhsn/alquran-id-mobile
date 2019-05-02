import React, { Component } from 'react';
import { Linking } from 'react-native';
import Theme, { createStyle } from 'react-native-theming';
import { darkThemes, lightThemes } from '../themes/themes';
import { 
    ThemedSwitch,
    ThemedMaterialsIcon,
    ThemedScrollView,
    ThemedTouchableOpacity
} from '../themes/customs/components';
import ThemeConstants from '../themes/navigations/ThemeConstants';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../store/actionCreators';

class Setting extends Component{

    constructor(props){
        super(props);
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

    goToDeveloperSite = () => {
        const url = 'https://www.yeedevstudio.com';
        Linking.canOpenURL(url)
        .then((supported) => {
            if (!supported) console.log("Can't handle url: " + url);
            else return Linking.openURL(url);
        })
        .catch((err) => console.error('An error occurred', err));
    }

    goToRateThisApp = () => {
        const url = 'https://play.google.com/store/apps/details?id=com.alquranindonesia';
        Linking.canOpenURL(url)
        .then((supported) => {
            if (!supported) console.log("Can't handle url: " + url);
            else return Linking.openURL(url);
        })
        .catch((err) => console.error('An error occurred', err));
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
                <Theme.View style={styles.container} >
                    <Theme.View style={styles.item}>
                        <Theme.Text style={styles.itemText}>
                            Dark Mode
                        </Theme.Text>
                        <ThemedSwitch
                            disabled={false}
                            onValueChange={ (value) => this.handleThemeApply(value) }
                            trackColor={ {false: '#aaaaaa', true: '#ffedc2'} }
                            thumbColor='@thumbColorSwitch'
                            value={this.props.darkMode}
                        />
                    </Theme.View>
                    <ThemedTouchableOpacity 
                        style={styles.item}
                        onPress={ () => this.goToDeveloperSite() }
                    >
                        <Theme.Text style={styles.itemText}>
                            Pengembang
                        </Theme.Text>
                        <ThemedMaterialsIcon style={styles.image} name="web" size={25} color="@textColorTertiary"/>
                    </ThemedTouchableOpacity>
                    <ThemedTouchableOpacity 
                        style={styles.item}
                        onPress={ () => this.goToRateThisApp() }
                    >
                        <Theme.Text style={styles.itemText}>
                            Feedback
                        </Theme.Text>
                        <ThemedMaterialsIcon style={styles.image} name="star" size={25} color="@textColorTertiary"/>
                    </ThemedTouchableOpacity>
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