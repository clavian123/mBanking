import React from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    ScrollView,
    Text,
    Picker
} from 'react-native';

class AccountList extends React.Component {

    constructor(props) {
        super(props);
    }

    handleClick = (name, number) => {
        this.props.setChosenAccount(number, name);
    }

    render() {

        const { accounts } = this.props;

        return (
            <ScrollView>
                {
                    accounts.map(account =>
                        <View style={styles.container}>
                            <TouchableOpacity style={styles.touchable} onPress={() => this.handleClick(account.name, account.number)}>
                                <Text style={styles.textName}>{account.name}</Text>
                                <Text>{account.number}</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 1,
        borderColor: 'darkgray',
        borderStyle: 'solid',
    },
    touchable: {
        padding: 10,
    },
    textName: {
        fontWeight: 'bold',
        color: 'blue',
        fontSize: 16,
    },
})

export default AccountList;
