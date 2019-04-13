import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Text,
    Switch,
    TouchableHighlight,
    StyleSheet
} from 'react-native';
import Theme, { createStyle } from 'react-native-theming';
import themes from '../themes/themes';
import { 
    ThemedSwitch,
    ThemedMaterialsIcon,
    Bar,
    ThemedScrollView
} from '../themes/customs/components';
import ThemeConstants from '../themes/navigations/ThemeConstants';

class Setting extends Component{

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

    state = {
        darkMode: false
    }

    render(){
        console.log(this.props);
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
                            onValueChange={ () => this.setState({ darkMode: !this.state.darkMode })}
                            trackColor={ {false: '@ToggleSwitchInActive', true: '@ToggleSwitchActive'} }
                            thumbColor='@buttonColorPrimary'
                            value={this.state.darkMode}
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
                <View style={{ flexDirection: 'row' }}>
                { themes.map(theme => (
                    <TouchableHighlight key={theme.name} onPress={ () => {
                        theme.apply()
                        if (theme.name === 'Dark') this.props.screenProps.dark();
                        if (theme.name === 'Light') this.props.screenProps.light();
                    }}>
                        <Theme.Text style={{ color: '@buttonTextPrimary' }}>{theme.name}</Theme.Text>
                    </TouchableHighlight>
                    ))
                }
                </View>
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

export default Setting;