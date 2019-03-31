import React from 'react';
import SearchHeader from '../components/SearchHeader/SearchHeader';
import SuratList from '../screens/SuratList';
import Surat from '../screens/Surat';
import Bookmark from '../screens/Bookmark';
import Setting from '../screens/Setting';
import Search from '../screens/Search';

import {
    createStackNavigator,
    createBottomTabNavigator,
    createAppContainer 
} from 'react-navigation';

const ReadNavigator = createStackNavigator(
    {
        SuratList: {
            screen: SuratList,
            navigationOptions: {
                title: 'Daftar Surat',
            }
        },
        Surat : {
            screen: Surat,
        },
    },
    {
        initialRouteName: 'SuratList',
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#2bc0ff',
                height: 57
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
                color: '#ffffff',
                fontSize: 22,
            },
        }
    }
)

const BookmarkNavigator = createStackNavigator(
    {
        Bookmark: {
            screen: Bookmark,
            navigationOptions: {
                title: 'Bookmark'
            }
        },
        Surat : {
            screen: Surat,
        },
    },
    {
        initialRouteName: 'Bookmark',
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#2bc0ff',
                height: 57
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
                color: '#ffffff',
                fontSize: 22,
            },
        }
    }
)

const SearchNavigator = createStackNavigator(
    {
        Search: {
            screen: Search,
            navigationOptions: {
                header: navProps => <SearchHeader {...navProps} />,
                title: 'Pencarian'
            }
        },
        Surat : {
            screen: Surat,
        }
    },
    {
        initialRouteName: 'Search',
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#2bc0ff',
                height: 57
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
                color: '#ffffff',
                fontSize: 22,
            },
        }
    }
)

const SettingNavigator = createStackNavigator(
    {
        Setting : {
            screen: Setting,
            navigationOptions: {
                title: 'Pengaturan',
                height: 57
            }
        }        
    },
    {
        initialRouteName: 'Setting',
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#2bc0ff',
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
                color: '#ffffff',
                fontSize: 22,
            },
        }
    }
)

export default createAppContainer(createBottomTabNavigator(
    {
        Read: ReadNavigator,
        Bookmark: BookmarkNavigator,
        Search: SearchNavigator,
        Setting: SettingNavigator
    },
    {
        initialRouteName: 'Search',
        order: ['Read', 'Bookmark', 'Search', 'Setting'],
        animationEnabled: true
    }
));