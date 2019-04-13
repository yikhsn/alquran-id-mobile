import { createTheme } from 'react-native-theming';

export default themes = [
    createTheme({
        
        containerColor: '#eaeaea',
        backgroundColor: '#ffffff',
        boxColor: '#ffffff',

        buttonColorPrimaryHighlight: '#80d9ff',
        buttonColorSecondaryHighlight: '#a2e3ff',

        modalPrimaryButtonIcon: '#ffffff',
        modalSecondaryButtonIcon: '#ffffff',

        borderColor: '#eaeaea',

        textColorPrimary: '#444444',
        textColorSecondary: '#555555',
        textColorSecondary2: '#666666',
        textColorTertiary: '#888888',
        textColorQuaternary: '#aaaaaa',

        textColorLight: '#ffffff',
        textColorLightSecondary: '#DFF2FB',

        buttonColorPrimary: '#2bc0ff',
        buttonColorSecondary: '#5DCFFF',
        buttonColorTertiary: '#6FD4FF',

        ToggleSwitchActive: '#b3e8ff',
        ToggleSwitchInActive: '#aaaaaa',

        buttonTextPrimary: '#444444',
        buttonTextSecondary: '#666666',

        statusBarBackground: '#00a2e6',
        statusBar: 'light-content',
    }, 'Light'),
    createTheme({
        containerColor: '#262626',
        backgroundColor: '#262626',
        boxColor: '#373737',

        buttonColorPrimaryHighlight: '#373737',
        buttonColorSecondaryHighlight: '#595959',

        modalPrimaryButtonIcon: '#2bc0ff',
        modalSecondaryButtonIcon: '#d4d4d4',

        borderColor: '#373737',

        textColorPrimary: '#d4d4d4',
        textColorSecondary: '#c3c3c3',
        textColorSecondary2: '#bbb',
        textColorTertiary: '#aaa',
        textColorQuaternary: '#909090',

        textColorLight: '#d4d4d4',
        textColorLightSecondary: '#ffffff',

        buttonColorPrimary: '#262626',
        buttonColorSecondary: '#373737',
        buttonColorTertiary: '#373737',

        ToggleSwitchActive: 'yellow',
        ToggleSwitchInActive: '#aaaaaa',

        buttonTextPrimary: '#ffffff',
        buttonTextSecondary: '#cccccc',

        statusBarBackground: '#1D1D1D',
        statusBar: 'light-content',
    }, 'Dark'),
];
