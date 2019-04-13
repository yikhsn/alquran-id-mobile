import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
                fontSize: 20,
                fontFamily: 'Roboto-Regular',
            },
        }
    }
)

ReadNavigator.navigationOptions = ({ navigation }) => {
    let tabBarVisible;
    if (navigation.state.routes.length > 1) {
      navigation.state.routes.map(route => {
        if (route.routeName === "Surat") {
          tabBarVisible = false;
        } else {
          tabBarVisible = true;
        }
      });
    }
  
    return {
      tabBarVisible
    };
};

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
                fontSize: 20,
                fontFamily: 'Roboto-Regular',
            },
        }
    }
)

BookmarkNavigator.navigationOptions = ({ navigation }) => {
    let tabBarVisible;
    if (navigation.state.routes.length > 1) {
      navigation.state.routes.map(route => {
        if (route.routeName === "Surat") {
          tabBarVisible = false;
        } else {
          tabBarVisible = true;
        }
      });
    }
  
    return {
      tabBarVisible
    };
};

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
                fontSize: 20,
                fontFamily: 'Roboto-Regular',
            },
        }
    }
)

SearchNavigator.navigationOptions = ({ navigation }) => {
    let tabBarVisible;
    if (navigation.state.routes.length > 1) {
      navigation.state.routes.map(route => {
        if (route.routeName === "Surat") {
          tabBarVisible = false;
        } else {
          tabBarVisible = true;
        }
      });
    }
  
    return {
      tabBarVisible
    };
};

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
                fontSize: 20,
                fontFamily: 'Roboto-Regular',
            },
        }
    }
)

export default createAppContainer(createBottomTabNavigator(
    {
        Reads: ReadNavigator,
        Bookmarks: BookmarkNavigator,
        Search: SearchNavigator,
        Settings: SettingNavigator
    },
    {
        initialRouteName: 'Settings',
        order: ['Reads', 'Search', 'Bookmarks', 'Settings'],
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                let IconComponent = Ionicons;
                let iconName;
                if (routeName === 'Reads') {
                    iconName = `md-book`; 
                }
                else if (routeName === 'Bookmarks') {
                    iconName = `md-bookmarks`;
                }
                else if (routeName === 'Search') {
                    iconName = `md-search`;
                }
                else if (routeName === 'Settings') {
                    iconName = `md-settings`;
                }
        
                // You can return any component that you like here!
                return <IconComponent name={iconName} size={32} color={tintColor} />;
            },
        }),
        tabBarOptions: {
            tabStyle: {
                backgroundColor: '#262626',
                borderTopColor: '#262626'
            },
            showLabel: false,
            labelStyle: {
                fontSize: 12,
            },
            activeTintColor: '#2bc0ff',
            inactiveTintColor: '#666666',
        },
    }
));