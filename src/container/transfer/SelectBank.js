import React from 'react';

import{
    View,
    StyleSheet,
    Image,
    Text
} from 'react-native';

import { TextInput, FlatList } from 'react-native-gesture-handler';
import BankListItem from '../../component/BankListItem';
import { connect } from 'react-redux';

import {
    getBankList
} from '../../newFunction/transferFunction';

class SelectBank extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            keyword: '',
            bankList: [],
            searchList: []
        };    }

    async componentDidMount(){
        this.setState({ bankList : await this.props.dispatch(getBankList()) });
    }

    handleSearch = (text) => {
        if(text != '') {
            if(isNaN(text)) { 
                this.setState({ searchList: this.state.bankList.filter((item) => item.bank_name.includes(text.toUpperCase())) })
            } else {
                this.setState({ searchList: this.state.bankList.filter((item) => item.bank_code.includes(text)) })
            }
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.searchContainer}>
                    <TextInput
                        placeholder="Please input Bank name or code" 
                        style={styles.searchInput}
                        onChangeText={(text) => { this.setState({ keyword: text }); this.handleSearch(text) }}
                    />
                    <Image style={styles.searchIcon} source={require('../../../assets/icon-search-headed-left.png')} />
                </View>

                <View style={styles.viewOr}>
                    <View style={styles.viewLine} />
                    <Text style={{ color: 'grey', fontSize: 12, paddingHorizontal: 15 }}>OR</Text>
                    <View style={styles.viewLine} />
                </View>

                <FlatList
                    data={this.state.keyword == '' ? this.state.bankList : this.state.searchList}
                    extraData={this.state}
                    renderItem={({item}) => (
                        <BankListItem navigation={this.props.navigation} accNumber={this.props.route.params.accNumber} name={item.bank_name} code={item.bank_code}/>
                    )}
                    keyExtractor = {item => item.bank_name}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '100%',
        height: '100%'
    },
    searchContainer: {
        width: '90%',
        marginHorizontal: 20,
        marginVertical: 20,
        flexDirection: 'row'
    },
    searchInput:{
        width: '100%',
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#888888',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5
    },
    searchIcon:{
        width: 30,
        height: 30,
        position: 'absolute',
        marginVertical: 10,
        right: 10
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
        marginHorizontal: 40
    }
})

const mapStateToProps = state => ({
    loading: state.loading.load,
    deviceId: state.newLogin.deviceId,

    bankList: state.transfer.bankList,
    destAcc: state.transfer.destAcc
});

export default connect(mapStateToProps)(SelectBank);