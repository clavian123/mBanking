import { StyleSheet } from 'react-native'

import {
    getDeviceWidth
} from "../../../utils";

const deviceWidth = getDeviceWidth();

const cardWidth = (deviceWidth) * 0.85;

export default (
    styles = StyleSheet.create({
        container: {
            flex: 1,
            width: cardWidth,
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        buttonText: {
            color: "#ff0066",
            fontSize: 16,
            fontWeight: 'bold'
        },
        showLastTransactionContainer: {
            flex: 1,
            width: "100%",
            justifyContent: 'center',
            alignItems: 'center'
        },
        transaction: {
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 20,
            height: 80,
            borderBottomWidth: 1,
            borderColor: "#bfbfbf"
        },
        transactionImage: {
            height: 25,
            width: 25,
            marginRight: 15
        },
        transactionSub1: {
            height: "100%",
            justifyContent: "center",
            flexGrow: 1
        },
        transactionTextType: {
            fontSize: 15,
            fontWeight: "bold",
            marginBottom: 5
        },
        transactionTextDate: {
            fontSize: 14,
            opacity: 0.7
        },
        transactionSub2: {
            justifyContent: "center",
            flexGrow: 1
        },
        transactionInTextAmount: {
            fontSize: 16,
            color: "#009900",
            fontWeight: "bold",
            textAlign: "right"
        },
        transactionTextAmount: {
            fontWeight: "bold",
            textAlign: "right",
            fontSize: 15
        }
    })
)