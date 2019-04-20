import { createTheme } from 'react-native-theming';

export const lightThemes = 
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

        textColorArab: '#444444',
        textColorArabLight: '#ffffff',
        textColorArabDark: '#FFE8B1',

        textPlaceHolderSearch: '#B5E6FD',

        textColorLight: '#ffffff',
        textColorLightSecondary: '#DFF2FB',

        buttonColorPrimary: '#2bc0ff',
        buttonColorSecondary: '#5DCFFF',
        buttonColorTertiary: '#6FD4FF',

        thumbColorSwitch: '#505050',
        ToggleSwitchActive: '#b3e8ff',
        ToggleSwitchInActive: '#111111',

        buttonTextPrimary: '#444444',
        buttonTextSecondary: '#666666',

        statusBarBackground: '#00a2e6',
        statusBar: 'light-content',
    }, 'Light');

export const darkThemes = 
    createTheme({
        containerColor: '#1e1e1e',
        backgroundColor: '#1e1e1e',
        boxColor: '#2f2f2f',

        buttonColorPrimaryHighlight: '#2f2f2f',
        buttonColorSecondaryHighlight: '#595959',

        modalPrimaryButtonIcon: '#ffedc2',
        modalSecondaryButtonIcon: '#d4d4d4',

        borderColor: '#2f2f2f',

        textColorPrimary: '#d4d4d4',
        textColorSecondary: '#c3c3c3',
        textColorSecondary2: '#bbb',
        textColorTertiary: '#aaa',
        textColorQuaternary: '#909090',

        textColorArab: '#ffedc2',
        textColorArabLight: '#ffedc2',
        textColorArabDark: '#FFE8B1',

        textPlaceHolderSearch: '#8B8370',

        textColorLight: '#d4d4d4',
        textColorLightSecondary: '#ffffff',

        buttonColorPrimary: '#262626',
        buttonColorSecondary: '#2f2f2f',
        buttonColorTertiary: '#2f2f2f',

        thumbColorSwitch: '#505050',
        ToggleSwitchActive: '#b3e8ff',
        ToggleSwitchInActive: '#111111',

        buttonTextPrimary: '#ffffff',
        buttonTextSecondary: '#cccccc',

        statusBarBackground: '#1D1D1D',
        statusBar: 'light-content',
    }, 'Dark');

