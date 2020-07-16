import React from 'react';

import{
    View,
    StyleSheet,
    Image,
    Text
}from 'react-native'
import { TextInput, FlatList } from 'react-native-gesture-handler';
import BankListItem from '../../component/BankListItem';

class SelectBank extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
          bankList: [
              {
                  name: 'PT. BANK SINARMAS, TBK.',
                  code: '153'
              },
              {
                name: 'PT. BANK SINARMAS, TBK. UUS',
                code: '153'
              },
              {
                name: 'PT. BANK RAKYAT INDONESIA, TBK.',
                code: '002'
              },
              {
                name: 'PT. BANK MANDIRI, TBK.',
                code: '008'
              },
              {
                name: 'PT. BANK NEGARA INDONESIA TBK.',
                code: '009'
              }
          ]
        };
      }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.searchContainer}>
                    <TextInput
                        placeholder="Please input Bank name or code" 
                        style={styles.searchInput}
                    />
                    <Image style={styles.searchIcon} source={require('../../../assets/icon-search-headed-left.png')} />
                </View>

                <View style={styles.viewOr}>
                    <View style={styles.viewLine} />
                    <Text style={{ color: 'grey', fontSize: 12, paddingHorizontal: 15 }}>OR</Text>
                    <View style={styles.viewLine} />
                </View>

                <FlatList
                    data={this.state.bankList}
                    renderItem={({item}) => (
                        <BankListItem name={item.name} code={item.code}/>
                    )}
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

export default SelectBank;