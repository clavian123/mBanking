import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';

import { numberWithCommas } from '../generalFunction';

class StatementList extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        var moment = require('moment');

        const { statements } = this.props;

        if (statements == []){
            return (
                <Text>You don't have any statements.</Text>
            );
        };

        return (
            <ScrollView>
                {
                    statements.map(statement =>
                        <View style={styles.container} key={statement.idHistory}>
                            <View style={styles.viewSubLeft}>
                                <Text style={styles.textDate}>{moment(statement.date).format('DD/MM/YY')}</Text>
                                <Text style={styles.textTitle}>{(statement.title).toUpperCase()}</Text>
                                <Text style={styles.textNote}>{statement.note}</Text>
                            </View>
                            <View style={styles.viewSubRight}>
                                <Text
                                    style={[styles.textAmount, { color: statement.amount > 0 ? 'green' : 'red' }]}
                                >
                                    Rp {numberWithCommas(statement.amount > 0 ? statement.amount*1 : statement.amount*-1)}</Text>
                                <Text style={styles.textType}>{statement.amount > 0 ? 'DB' : 'CR'}</Text>
                            </View>
                        </View>
                    )
                }
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: 'darkgray',
        borderStyle: 'solid',
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
    }
})

export default StatementList;
