import { StyleSheet } from 'react-native'

export default (
    styles = StyleSheet.create({
        container: {
            flex: 1,
            paddingHorizontal: 20,
            backgroundColor: 'white'
        },
        transactionTypeContainer: {
            marginVertical: 20,
            paddingBottom: 20,
            borderBottomWidth: 1,
            borderBottomColor: "#bfbfbf"
        },
        transactionTypeText: {
            fontSize: 20,
            fontWeight: 'bold'
        },
        itemContainer: {
            marginBottom: 20
        },
        itemTitleText: {
            fontSize: 17
        },
        itemText: {
            fontSize: 17,
            fontWeight: 'bold'
        }
    })
)