import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
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
                        <View style={styles.container} key={account.accNumberDest}>
                            <TouchableOpacity style={styles.touchable} onPress={() => this.handleClick(account.fullName, account.accNumberDest)}>
                                <Text style={styles.textName}>{account.fullName.toUpperCase()}</Text>
                                <Text>{account.accNumberDest}</Text>
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
