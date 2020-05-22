import React from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    Text
}from 'react-native';
import SourceAccountListItem from '../../component/SourceAccountListItem';

class SelectSourceAccount extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
          account: [
              {
                  number: '123898890111',
                  type: 'Emoney Account',
                  name: 'Jun Chandra',
                  balance: '-'
              },
              {
                  number: '000231233',
                  type: 'Tabunganku',
                  name: 'Jun Chandra',
                  balance: '-'
              }
          ]
        };
    }

    render(){

        return(
            <View style={styles.container}>
                <Text style={styles.selectLabel}>Select Source Account</Text>
                <Text style={styles.savingLabel}>Saving Account</Text>

                <FlatList 
                    style={styles.list}
                    data={this.state.account}
                    renderItem={({item}) => (
                        <SourceAccountListItem number={item.number} type={item.type} name={item.name} balance={item.balance}/>
                    )}
                />
            </View>
        )

    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#DCDCDC'
    },
    selectLabel:{
        color: '#696969',
        marginHorizontal: 20,
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 20
    },
    savingLabel:{
        color: '#696969',
        marginHorizontal: 20,
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 10
    },
    list: {
        width: '90%',
        marginHorizontal: 20
    }
})

export default SelectSourceAccount;