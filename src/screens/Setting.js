import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Text,
    Switch,
    StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class Setting extends Component{

    state = {
        darkMode: true
    }

    render(){
        return(
            <View style={styles.screen}>
                <ScrollView style={styles.container} >
                    <View style={styles.item}>
                        <Text style={styles.itemText}>
                            Dark Mode
                        </Text>
                        <Switch
                            disabled={false}
                            onValueChange={ () => this.setState({ darkMode: !this.state.darkMode })}
                            trackColor={ {false: '#ccc', true: '#b3e8ff'} }
                            thumbColor='#2bc0ff'
                            value={this.state.darkMode}
                        />
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.itemText}>
                            Pengembang
                        </Text>
                        <Icon style={styles.image} name="web" size={25} color="#888888"/>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.itemText}>
                            Feedback
                        </Text>
                        <Icon style={styles.image} name="star" size={25} color="#888888"/>
                    </View>
                </ScrollView>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingVertical: 5,
        backgroundColor: '#eaeaea',
    },
    container: {
        flex: 1,
        paddingHorizontal: 10,
    },
    item: {
        backgroundColor: '#ffffff',
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
        color: '#444444',
    },
})

export default Setting;