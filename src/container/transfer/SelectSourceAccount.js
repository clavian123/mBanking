import React from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    Text
}from 'react-native';
import SourceAccountListItem from '../../component/SourceAccountListItem';
import { connect } from 'react-redux';

class SelectSourceAccount extends React.Component{

    constructor(props) {
        super(props);
    }

    render(){
        
        return(
            <View style={styles.container}>
                <Text style={styles.selectLabel}>Select Source Account</Text>
                <Text style={{...styles.savingLabel, fontWeight: 'normal'}}>Saving Account</Text>

                <FlatList 
                    style={styles.list}
                    data={this.props.balance}
                    renderItem={({item}) => (
                        <SourceAccountListItem
                            number={item.accountNumber}
                            type={item.type ? item.type : "Saving Account"}
                            name={this.props.name.toUpperCase()}
                            balance={item.balance}
                            navigation={this.props.navigation}/>
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
        backgroundColor: '#DCDCDC',
        // backgroundColor: 'blue'
    },
    selectLabel:{
        // color: '#696969',
        marginHorizontal: 20,
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 20
    },
    savingLabel:{
        // color: '#696969',
        marginHorizontal: 20,
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 10
    },
    list: {
        width: '100%',
        paddingHorizontal: 20,
        
    }
})

const mapStateToProps = state => ({
    balance: state.home.balance,
    loading: state.home.loading,
    name: state.login.name,
  })

export default connect(mapStateToProps)(SelectSourceAccount);