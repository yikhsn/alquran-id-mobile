import React, { Component } from 'react'
import { 
    View,
    ScrollView,
    FlatList,
    Dimensions,
    Platform,
    Picker,
    Text,
    TouchableHighlight,
    TextInput,
    StyleSheet
 } from 'react-native';
import { getSingleSurat } from '../controllers/SuratController';
import HeaderSurat from '../components/HeaderSurat/HeaderSurat';
import Ayat from '../components/Ayat/Ayat';
import Bismillah from '../components/Bismillah/Bismillah';
import GoToSuratBotton from '../components/GoToSuratButton/GoToSuratButton';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../store/actionCreators';

class Surat extends Component{
    constructor(props){
        super(props);

        this.state = {
            ayats: [],
            selectedSuratId: 1,
            selectedAyat: null
        }
    }

    static navigationOptions = ({ navigation }) => ({
        title: 'Surat ' + navigation.state.params.surat.surat_nama,
        headerRight: <GoToSuratBotton />
        
    })

    componentDidMount(){
        this.initSurat();
    }

    initSurat = () => {
        const surat_id = this.props.navigation.getParam('surat_id', null);
        getSingleSurat(surat_id).then( (ayats) => this.setState({ ayats }));
    }

    handleChangePicker = (itemValue) => {
        this.setState({ selectedSuratId: itemValue  });
    }

    navigateFromModal = () => {
        this.props.toggleGoToAyatModal();

        const surat = this.props.suratList.find( surat => surat.id === this.state.selectedSuratId );

        this.props.navigation.navigate('Surat', {
            surat: surat,
            surat_id: surat.id
        });
    }
    
    render(){
        const surat_id = this.props.navigation.getParam('surat_id', null);
        const surat = this.props.navigation.getParam('surat', null);

        const deviceWidth = Dimensions.get("window").width;
        const deviceHeight = Platform.OS === "ios"
            ? Dimensions.get("window").height
            : require("react-native-extra-dimensions-android").get("REAL_WINDOW_HEIGHT");
           
        return(
            <ScrollView>
                <HeaderSurat
                    surat={surat}
                />
                {
                    surat_id !== 1 ? ( surat_id !== 9 ? <Bismillah /> : null ) : null
                }
                <FlatList
                    data={ this.state.ayats }
                    renderItem={ ({ item }) => {
                        return <Ayat 
                            ayat={item}
                            navigation={this.props.navigation}
                        />
                    }}
                    keyExtractor={ (item, index) => item + index }
                />

                <View>
                    <Modal 
                        isVisible={this.props.goToAyatVisible}
                        deviceWidth={deviceWidth}
                        deviceHeight={deviceHeight} 
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        onBackdropPress={ () => this.props.toggleGoToAyatModal() }
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalHeader}>Lompat ke</Text>
                                <View style={styles.inputSurat}>
                                    <Text style={styles.inputSuratLabel}>Surat</Text>
                                    <Picker
                                        style={styles.inputSuratInput}
                                        mode='dropdown'
                                        selectedValue={this.state.selectedSuratId}
                                        onValueChange={(itemValue, indexValue) => 
                                            this.handleChangePicker(itemValue)
                                        }>
                                        { this.props.suratList.map((item, index) => {
                                            return (<Picker.Item label={item.surat_nama} value={item.id} key={item.id}/>) 
                                        })}
                                    </Picker>
                                </View>
                                <View style={styles.inputAyatContainer}>
                                    <Text style={styles.inputAyatLabel}>Ayat</Text>
                                    <TextInput
                                        style={styles.inputAyatInput}
                                        value={this.state.selectedAyat}
                                        placeholder='Ayat, misal: 1'
                                    />
                                </View>
                            </View>
                            <View style={styles.buttonContainer}>
                                <TouchableHighlight
                                    onPress={ () => this.props.toggleGoToAyatModal() }
                                    style={styles.buttonClose}
                                >
                                     <Icon style={styles.buttonText} name='close' size={28} color='#ffffff' />
                                </TouchableHighlight>
                                <TouchableHighlight
                                    onPress={ () => this.navigateFromModal() }
                                    style={styles.buttonSubmit}
                                >
                                     <Icon style={styles.buttonText} name='page-next' size={28} color='#ffffff' />
                                </TouchableHighlight>
                            </View>
                        </View>
                    </Modal>
                </View>

            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    modalContainer: {
        height: ( Dimensions.get("window").width  * 90 / 100 ) * 60 / 100,
        width: '90%',
    },
    modalContent: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
    },
    modalHeader: {
        fontSize: 20,
        marginBottom: 5,
        fontWeight: '500',
        fontFamily: 'Roboto-Regular',
        color: '#444444'
    },
    inputAyatContainer:{
        flex: 1,
        color: '#444444',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputSurat: {
        flex: 1,
        color: '#444444',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputAyatLabel: {
        color: '#444444',
        fontSize: 16,
        width: '20%'
    },
    inputSuratLabel: {
        color: '#444444',
        fontSize: 16,
        width: '20%'
    },
    inputSuratInput: {
        flex: 1
    },
    inputAyatInput: {
        flex: 1,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#eaeaea'
    },
    buttonContainer: {
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
    },
    buttonClose: {
        flex: 1,
        backgroundColor: '#5ecfff',
        padding: 5,
        justifyContent: 'center',
        alignContent: 'center',
    },
    buttonSubmit: {
        flex: 2,
        backgroundColor: '#2bc0ff',
        padding: 5,
        justifyContent: 'center',
        alignContent: 'center',
    },
    buttonText : {
        alignContent: 'center',
        alignSelf: 'center'
    }
})

const mapStateToProps = state => {
    return {
        suratList: state.suratList,
        goToAyatVisible: state.goToAyatVisible
    }
}

const mapDisptatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDisptatchToProps)(Surat);