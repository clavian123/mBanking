import { StyleSheet } from 'react-native'

import {
    getDeviceHeight,
    getDeviceWidth
} from "../../../utils";

const deviceWidth = getDeviceWidth();

const cardWidth = (deviceWidth - 20) * 0.85;
const cardHeight = cardWidth * 3 / 5;

export default (
    styles = StyleSheet.create({
        container: {
            flex: 1,
            marginHorizontal: 35,
            width: cardWidth,
            height: cardHeight,
            justifyContent: 'space-between',
            backgroundColor: "#ff0066",
            borderRadius: 10,
            shadowColor: '#000',
            shadowOffset: { deviceWidth: 0.5, deviceHeight: 0.5 },
            shadowOpacity: 0.5,
            shadowRadius: 3,
            elevation: 5,
            paddingVertical: 20,
            paddingHorizontal: 20
        },
        header: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        headerText: {
            color: 'white',
            fontSize: 18
        },
        headerIcon: {
            tintColor: 'white',
            width: 25,
            height: 25
        },
        balanceContainer: {
            marginBottom: 20
        },
        balanceText: {
            color: 'white',
            fontSize: 21
        },
        footer: {
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        footerTitleText: {
            color: 'white'
        },
        footerDescriptionText: {
            fontSize: 17,
            color: 'white'
        },
        iconNext: {
            marginTop: 10,
            tintColor: 'white',
            width: 20,
            height: 20
        }
    })
)