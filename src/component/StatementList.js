import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
} from 'react-native';

class StatementList extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        var moment = require('moment');

        const { statements } = this.props;

        return (
            <ScrollView>
                {
                    statements.map(statement => 
                        <View style={styles.container} key={statement.key}>
                            <View style={styles.viewSubLeft}>
                                <Text style={styles.textDate}>{moment(statement.date).format('DD/MM/YY')}</Text>
                                <Text style={styles.textTitle}>{statement.title}</Text>
                                <Text style={styles.textNote}>{statement.note}</Text>
                            </View>
                            <View style={styles.viewSubRight}>
                                <Text style={[styles.textAmount, {color: statement.type === 'CR' ? 'green' : 'red'}]}>Rp {numberWithCommas(statement.amount)}</Text>
                                <Text style={styles.textType}>{statement.type}</Text>
                            </View>
                        </View>
                    )
                }
            </ScrollView>
        )
    }
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
