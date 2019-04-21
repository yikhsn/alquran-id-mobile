import React, { Component } from 'react'
import  { BottomTabBar } from 'react-navigation';
import ThemeConstants from '../../themes/navigations/ThemeConstants';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../store/actionCreators';

class ThemedBottomTabbar extends Component{
    render(){
        const theme = this.props.darkMode ? 'dark' : 'light' ;

        let currentTheme = ThemeConstants[theme];

        return(
            <BottomTabBar
                {...this.props}
                activeTintColor={currentTheme.activeTintColor}
                inactiveTintColor={currentTheme.inactiveTintColor}
                style={{
                    backgroundColor: currentTheme.backgroundColorTab,
                    borderTopColor: currentTheme.borderColor,
                }}
            />
        )
    }
}

const mapStateToProps = state => {
    return {
        darkMode: state.theme.darkMode
    }
}

const mapDispatchToprops = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToprops)(ThemedBottomTabbar);