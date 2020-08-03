import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';

import Loading from '../Loading';

import { numberWithCommas } from '../generalFunction';
import { Icon } from 'react-native-elements'
import { TouchableOpacity } from 'react-native';

class StatementList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false
        }
    }

    componentDidMount(){
        this.setState({
            refreshing: this.props.refreshing
        })
    }

    handleStatementDetailClicked(id){
        
        this.props.navigation.navigate('AccountStatementDetail',{
            statement: this.props.statements.filter((item) => item.id == id)
        });
        
    }

    render() {

        var moment = require('moment');

        var  statements  = this.props.statements.reverse();

        if(this.state.refreshing){
            return (
                <Loading></Loading>
            )
        }
        else{

        } 
        if (statements.length == 0){
            return (
                <Text style={styles.emptyStatementText}>You don't have any statements.</Text>
            );
        }else{
            return (
                <ScrollView style={styles.list}>
                    {
                         statements.map(statement =>
                            
                            <TouchableOpacity 
                                style={styles.container}
                                key={statement.id}
                                onPress={this.props.home ? null : () => this.handleStatementDetailClicked(statement.id)}
                                disabled={this.props.home ? true : false}>

                                <View style={styles.viewSubLeft}>
                                    <Text style={styles.textDate}>{moment(statement.created_date).format('DD/MM/YY')}</Text>
                                    <Text style={styles.textTitle}>{(statement.detail).toUpperCase()}</Text>
                                    <Text style={styles.textNote}>{statement.note}</Text>
                                </View>
                                <View style={styles.viewSubRight}>
                                    <Text
                                        style={[styles.textAmount, { color: statement.amount > 0 ? 'green' : 'red' }]}
                                    >
                                      {statement.amount > 0 ? null : "-"}  Rp {numberWithCommas(statement.amount > 0 ? statement.amount*1 : statement.amount*-1)}</Text>
                                    <Text style={styles.textType}>{statement.amount > 0 ? 'CR' : 'DB'}</Text>
                                    <Text style={styles.textDate}>{statement.transaction_type}</Text>
                                    
                                </View>
                                {
                                    this.props.home ?
                                        null :
                                        <Icon
                                            name="arrow-right"
                                            type="simple-line-icon"
                                            iconStyle={styles.statementIcon}
                                            underlayColor="#d63447">
                                        </Icon>
                                }
                                
                            </TouchableOpacity>
                        )
                    }
                </ScrollView>
            )
        }

        
    }
}

const styles = StyleSheet.create({
    // list: {
    //     height: '100%'
    // },

    container: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: 'darkgray',
        borderStyle: 'solid',
        alignItems: 'center',
        // backgroundColor: 'red',
    },
    viewSubLeft: {
        flex: 1,
        padding: 10,
    },
    viewSubRight: {
        padding: 10,
    },
    textDate: {
        fontWeight: 'bold',
        fontSize: 15,
    },
    textTitle: {
        fontSize: 15,
    },
    textNote: {
        fontSize: 15,
    },
    textAmount: {
        textAlign: 'right',
        color: 'red',
        fontWeight: 'bold',
        fontSize: 15,
    },
    textType: {
        textAlign: 'right',
        color: 'blue',
        fontSize: 15,
    },
    emptyStatementText: {
        backgroundColor: 'white',
        textAlign: 'center',
        width: '70%',
        alignSelf: 'center'
    },
    statementIcon: {
        fontSize: 13,
        color: '#d63447',
        marginRight: 10
    },
})

export default StatementList;
