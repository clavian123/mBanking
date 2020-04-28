import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';

import { getListClientDestination } from '../../action/transfer/transferFunction';
import AccountList from '../../component/AccountList';
import Loading from '../../Loading';

class ChooseDestinationAccount extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            search: '',
            // accounts:
            //     [
            //         { id: '0', number: '123123123', name: 'MICHAEL JORDAN' },
            //         { id: '1', number: '234234234', name: 'LIONEL MESSI' },
            //         { id: '2', number: '350350350', name: 'FRANK LAMPARD' },
            //     ],
        };
    }

    componentDidMount = () => {
        const { accNumber } = this.props;
        this.props.dispatch(getListClientDestination(accNumber));
    }

    updateSearch = search => {
        this.setState({ search });
    }

    setChosenAccount = (number, name) => {
        const { navigation } = this.props;
        navigation.navigate('TransferToAnotherAccount', {
            name: name,
            number: number,
        });
    }

    registerAccount = () => {
        const { navigate } = this.props.navigation;
        navigate('RegisterDestinationAccount');
    }

    render() {

        const { search } = this.state;
        const { listDest } = this.props;

        return (

            <View>
                <View style={styles.subView}>
                    <View style={styles.subViewSearchBar}>
                        <SearchBar
                            onChangeText={this.updateSearch}
                            value={search}
                            platform="android"
                            placeholder="Search account"
                        />
                    </View>
                    <TouchableOpacity style={styles.buttonAdd} onPress={() => this.registerAccount()}>
                        <Image
                            style={styles.imageAdd}
                            source={require('../../../assets/icon-add.png')}
                        />
                    </TouchableOpacity>
                </View>
                <AccountList
                    accounts={listDest}
                    setChosenAccount={this.setChosenAccount}
                    style={styles.list}
                />
            </View>
        )
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    subView: {
        width: '100%',
        flexDirection: 'row',
    },
    subViewSearchBar: {
        flex: 1,
    },
    iconImage: {
        width: 35,
        height: 35,
    },
    list: {
        flex: 1,
    },
    buttonAdd: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: 'white',
        paddingRight: 10,
        paddingLeft: 10,
    },
    imageAdd: {
        height: 22,
        width: 22,
    }
})

const mapStateToProps = state => ({
    accNumber: state.login.accNumber,
    pin: state.login.pin,
    listDest: state.transfer.listDest
});

export default connect(mapStateToProps)(ChooseDestinationAccount);
