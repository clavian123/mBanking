import { StyleSheet } from 'react-native'

import {
    getDeviceHeight,
    getDeviceWidth
} from "../../../utils";

const deviceWidth = getDeviceWidth();

const cardWidth = (deviceWidth - 20) * 0.85;

export default (
    styles = StyleSheet.create({
        bullet: {
            marginHorizontal: 2,
            width: 8,
            height: 8,
            borderRadius: 5,
            backgroundColor: 'black',
            opacity: 0.5
        },
        statementContainer: {
            flex: 1,
            marginHorizontal: 35,
            width: cardWidth,
            justifyContent: 'space-between',
            alignItems: 'center'
        }
    })
)