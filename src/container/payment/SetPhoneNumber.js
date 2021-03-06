import React, {Component} from 'react';
import{
    KeyboardAvoidingView,
    View,
    Text,
    StyleSheet,
    Image,
    TextInput, 
    TouchableOpacity,
    FlatList,
    ToastAndroid
} from 'react-native';

import PaymentListItem from '../../component/PaymentListItem';

import { connect } from 'react-redux';

import {
    refreshEasyPinLogin
} from '../../newFunction/loginFunction'

import { 
    getUserTargetSubscribers,
    checkSubscriberExist,
    setTargetSubscriber
} from '../../newFunction/paymentFunction'

import FloatingInputLabel from '../../component/FloatingInputLabel';

class SetPhoneNumber extends Component {

    constructor(props) {
        super(props);
        this.state = {
          buttonColor: '#FA8072',
          phoneNumber: "",
          alias: "",
          keyword: "",
          subscriberList: [],
          searchList: [],
          loading: false,
        };
    }

    async componentDidMount(){
        const { deviceId, route } = this.props;
        this.props.dispatch(refreshEasyPinLogin(deviceId))
        this.setState({ subscriberList: await this.props.dispatch(getUserTargetSubscribers(deviceId, route.params.code)) })
    }

    componentWillUnmount(){
        this.setState = (subscriberList, callback)=>{
            return;
        };
    }

    handleChangeColor = () => {
        if(this.state.phoneNumber.length >= 10){
          this.setState({ buttonColor: '#ff0066' });
        }else{
          this.setState({ buttonColor: "#FA8072" })
        }
    }

    handleNext = async() => {
        const { deviceId, navigation } = this.props;
        this.props.dispatch(refreshEasyPinLogin(deviceId))
        let name = await this.props.dispatch(checkSubscriberExist(this.state.phoneNumber));
        if(this.state.phoneNumber.length >= 10){
            if( name != "" ) {
                await this.props.dispatch(setTargetSubscriber(this.state.phoneNumber, name, this.state.alias));
                navigation.navigate('PaymentSetAmount')
            } else {
                ToastAndroid.show('Phone number is not valid', ToastAndroid.SHORT)
            }
        }
    }

    handleSearch = (text) => {
        const { deviceId } = this.props
        if(text != "") {
            if(isNaN(text)) {
                this.props.dispatch(refreshEasyPinLogin(deviceId))
                this.setState({ searchList: this.state.subscriberList.filter( (item) => item.name.toUpperCase().includes(text.toUpperCase()) ) })
            } else {
                this.props.dispatch(refreshEasyPinLogin(deviceId))
                this.setState({ searchList: this.state.subscriberList.filter( (item) => item.subscriber_number.includes(text) ) })
            }
        }
    }

    refreshList = (newList) => {
        const { deviceId } = this.props
        this.props.dispatch(refreshEasyPinLogin(deviceId))
        this.setState({ subscriberList: newList })
    }

    render(){

        const { route } = this.props;

        return(
            <KeyboardAvoidingView style={styles.container} behavior={'height'}>
                <View style={styles.labelContainer}>
                    <View style={styles.payIconContainer}>
                        <Image style={styles.payIcon} source={require('../../../assets/icon-pay.png')}/>
                    </View>
                    <View style={styles.labelTextContainer}>
                        <Text style={styles.labelText}>Pay / Top up to</Text>
                        <Text style={styles.merchantText}>{route.params.merchant}</Text>
                    </View>
                </View>

                <View style={styles.phoneInputContainer}>
                    <View style={styles.phoneInputSubContainer}>
                        <TextInput 
                            style={styles.phoneInput} 
                            placeholder="Phone Number"
                            keyboardType="number-pad"
                            onChangeText={(text) => this.setState({ phoneNumber: text }, this.handleChangeColor)}
                        />
                        <Image style={styles.contactIcon} source={require('../../../assets/icon-contacts.png')}/>
                    </View>
                    <TouchableOpacity onPress={() => this.handleNext()} style={{...styles.nextIconContainer, backgroundColor: this.state.buttonColor}}>
                        <Image style={styles.nextIcon} source={require('../../../assets/icon-next.png')}/>
                    </TouchableOpacity>
                </View>

                <View style={styles.aliasInput}>
                <FloatingInputLabel 
                    label = {"Alias"}
                    hint = {"Alias"}
                    value = {this.state.alias}
                    input = {{fontSize: 15}}
                    borderBottomColor = {"#888888"}
                    borderBottomWidth = {1}
                    onChangeText = {(text) => this.setState({ alias: text })}
                />
                </View>

                <View style={styles.viewOr}>
                    <View style={styles.viewLine} />
                    <Text style={{ color: 'grey', fontSize: 12, paddingHorizontal: 15 }}>OR</Text>
                    <View style={styles.viewLine} />
                </View>

                <Text
                    style={{
                        fontSize: 16,
                        marginHorizontal: 20,
                    }}
                >
                    Find from previous transactions
                </Text>

                <View style={styles.searchSection}>
                    <Image
                        style={styles.searchIcon}
                        source={require('../../../assets/icon-search-headed-left.png')}
                    />
                    <TextInput 
                        placeholder="Biller name / Subscriber number"
                        style={styles.searchInput}
                        onChangeText={(text) => { this.setState({ keyword: text }); this.handleSearch(text) } }
                    />
                </View>
                
                <View style={styles.list}>
                    <FlatList
                        data = { this.state.keyword == "" ? this.state.subscriberList : this.state.searchList }
                        extraData = {this.state}
                        renderItem = {({item}) => (
                            <PaymentListItem navigation={this.props.navigation} refreshList={this.refreshList} code={route.params.code} name={item.name} number={item.subscriber_number} merchant={item.merchant_name}/>
                        )}
                        ListEmptyComponent={
                            <Text style={{ marginTop: 30, textAlign: 'center', color: 'grey' }}>Nothing to show</Text>
                        }
                        keyExtractor={item => item.subscriber_number}
                    />
                </View>

            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    labelContainer: {
        flexDirection: 'row',
        marginHorizontal: 20,
        width: '80%',
        marginVertical: 20,
        alignItems: 'center'
    },
    payIconContainer: {
        backgroundColor: 'dodgerblue',
        width: 35,
        height: 35,
        borderRadius: 50,
        justifyContent: 'center'
    },
    payIcon: {
        width: 20,
        height: 20,
        tintColor: 'white',
        alignSelf: 'center'
    },
    labelTextContainer: {
        marginLeft: 10
    },
    labelText: {
        fontSize: 22
    },
    merchantText: {
        fontSize: 16,
        color: '#888888'
    },
    phoneInputContainer: {
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20
    },
    phoneInputSubContainer: {
        width: '85%',
        justifyContent: 'center'
    },
    phoneInput: {
        width: '100%',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#888888",
        padding: 10,
        fontSize: 17
    },
    contactIcon: {
        width: 25,
        height: 25,
        tintColor: '#888888',
        position: 'absolute',
        right: 10
    },
    nextIconContainer: {
        backgroundColor: "#C10000",
        borderRadius: 50,
        width: 32,
        height: 32,
        justifyContent: 'center',
        marginLeft: 20
    },
    nextIcon: {
        width: 25,
        height: 25,
        tintColor: 'white',
        alignSelf: 'center',
    },
    aliasInput : {
        marginHorizontal: 10,
        width: "85%",
        marginBottom: 20
    },
    viewLine: {
        backgroundColor: 'grey',
        flex: 1,
        height: 1
    },
    viewOr: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 20,
        marginHorizontal: 20
    },
    searchSection: {
        flexDirection: 'row',
        marginHorizontal: 20,
        marginTop: 20
    },
    searchInput: {
        width: "90%",
        height: 50,
        fontSize: 17,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        borderColor: "#888888",
        flex: 1
    },
    searchIcon: {
        width: 25,
        height: 30,
        alignSelf: 'center',
        position: 'absolute',
        right: 10
    },
    list: {
        flex: 1,
        marginVertical: 20,
        marginHorizontal: 20
    }
});

const mapStateToProps = state => ({
    deviceId: state.newLogin.deviceId
})

export default connect(mapStateToProps)(SetPhoneNumber);