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
    Modal
} from 'react-native';
import PaymentListItem from '../../component/PaymentListItem';
import { checkPaymentAccountNumber, getTargetSubscriberList } from '../../action/payment/paymentFunction';
import { connect } from 'react-redux';
import Loading from '../../Loading';

class SetPhoneNumber extends Component {

    constructor(props) {
        super(props);
        this.state = {
          buttonColor: '#FA8072',
          phoneNumber: "",
          keyword: "",
          loading: false,
        };
    }

    componentDidMount(){
        const { cif_code, route } = this.props;
        this.props.dispatch(getTargetSubscriberList("", route.params.code, cif_code));
    }

    componentWillUnmount(){
        const { cif_code } = this.props;
        this.props.dispatch(getTargetSubscriberList("", "", cif_code));
    }

    handleChangeColor = () => {
        if(this.state.phoneNumber.length >= 10){
          this.setState({ buttonColor: "#C10000" });
        }else{
          this.setState({ buttonColor: "#FA8072" })
        }
    }

    handleNext = () => {
        const { navigation, route } = this.props;
        this.setState({loading: true})
        if(this.state.phoneNumber.length >= 10){
            this.props.dispatch(checkPaymentAccountNumber(route.params.code, this.state.phoneNumber)).then((res)=>{
                this.setState({loading: false})
                if(res){
                    navigation.navigate('PaymentSetAmount', {
                        phoneNumber: this.state.phoneNumber,
                        merchant: route.params.merchant
                    });
                }
            })
        }
    }

    handleSearch = () => {
        const keyword = this.state.keyword;
        const {cif_code, route} = this.props;
        this.props.dispatch(getTargetSubscriberList(keyword, route.params.code, cif_code));
    }

    render(){

        const { route } = this.props;
        const { loading } = this.state;
        return(
            <KeyboardAvoidingView style={styles.container} behavior={'height'}>
                {
                    loading ?
                    <Modal transparent={true}>
                        <Loading transparent={true}/>
                    </Modal>
                    : null
                }
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
                        onChangeText={(text) => this.setState({ keyword: text }, this.handleSearch)}
                    />
                </View>
                
                <View style={styles.list}>
                    <FlatList
                        data = {this.props.targetSubscriberList}
                        extraData = {this.props.targetSubscriberList}
                        renderItem = {({item}) => (
                            <PaymentListItem navigation={this.props.navigation} type={'byMerchant'} id={item.id} number={item.subscribernumber} merchant={item.merchant_detail.name} merchantCode={item.merchant_detail.code}/>
                        )}
                        ListEmptyComponent={
                            <Text style={{ marginTop: 30, textAlign: 'center', color: 'grey' }}>Nothing to show</Text>
                        }
                        keyExtractor={item => item.id}
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
    cif_code: state.login.cif_code,
    targetSubscriberList: state.payment.targetSubscriberList,
    loading: state.payment.loading,
    amount: state.payment.amount,
})

export default connect(mapStateToProps)(SetPhoneNumber);