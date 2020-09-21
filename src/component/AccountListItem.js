import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity
} from 'react-native'
import Swipeout from 'react-native-swipeout'
import { setDestinationAccount, deleteTargetAccount, getListDest } from '../action/transfer/transferFunction';
import { connect } from 'react-redux';

class AccountListItem extends React.Component{

    constructor(props) {
        super(props);
    }

    handleClick = () => {
        const { navigation } = this.props;
        this.props.dispatch(setDestinationAccount(this.props.id, this.props.bankCode, this.props.bankName, this.props.accNumber, this.props.name));
        navigation.navigate('SetAmount');
    }

    render(){

        const swipeBtns = [
            {
                component: (
                    <View style={styles.swipeContainer}>
                        <Image style={{tintColor: 'white', height: 25, width: 25, resizeMode: 'stretch'}}source={require('../../assets/icon-trash.png')} />
                    </View>
                ),
                marginVertical: 10,
                backgroundColor: "red",
                underlayColor: '#888888',
                onPress: () => {
                    const { listDest, cif_code } = this.props;
                    let acc = listDest.filter((item) => item.account_number == this.props.accNumber)[0];
                    deleteTargetAccount(acc.id);
                    this.props.dispatch(getListDest(cif_code, ""));
                }   
            }
        ]

        return(
            <Swipeout 
                style={{marginHorizontal: 20}}
                right={swipeBtns}
                autoClose={true}
                backgroundColor="transparent"
            >
                <TouchableOpacity onPress={this.handleClick} style={styles.container}>
                    <View style={styles.accountDetail}>
                        <Text style={{fontSize: 15}}>{this.props.name}</Text>
                        <Text style={{fontSize: 14}}>{this.props.accNumber}</Text>
                    </View>
                    <View style={styles.bankDetail}>
                        <Text style={styles.textBank} numberOfLines={2}>{this.props.bankName}</Text>
                    </View>
                    <Image style={styles.iconNext} source={require('../../assets/icon-next.png')}/>
                </TouchableOpacity>
            </Swipeout>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: 'lightgrey',
        paddingVertical: 10
    },
    accountDetail: {
        width: '45%'
    },
    bankDetail: {
        width: '45%'
    },
    textBank: {
        fontSize: 14, 
        color: '#888888', 
        flexWrap:'wrap', 
        textAlign: 'right'
    },
    iconNext: {
        height: 15,
        tintColor: 'lightgrey',
        width: 15,
        marginLeft: 15,
        alignSelf: 'center',
        resizeMode: 'stretch'
    },
    swipeContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    }
});

const mapStateToProps = state => ({
    cif_code: state.login.cif_code,
    listDest: state.transfer.listDest
});

export default connect(mapStateToProps)(AccountListItem);
