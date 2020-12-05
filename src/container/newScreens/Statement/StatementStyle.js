import { StyleSheet } from 'react-native'

import {
    getDeviceWidth,
    getDeviceHeight
} from "../../../utils";

const deviceWidth = getDeviceWidth();
const deviceHeight = getDeviceHeight();

const cardWidth = (deviceWidth - 20) * 0.85;
const cardHeight = (deviceHeight - 20) * 0.25;

const cardContainerHeight = (deviceHeight - 20) * 0.30;

const filterPopUpWidth = (deviceWidth - 20) * 0.75

export default (
    styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: 'white'
        },
        cardContainer: {
            height: cardContainerHeight,
            backgroundColor: '#DC143C'
        },
        card: {
            marginVertical: 20,
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
        balanceContainer: {
            marginBottom: 30
        },
        balanceText: {
            color: 'white',
            fontSize: 25,
            fontWeight: 'bold'
        },
        footer: {
            alignItems: 'center',
            flexDirection: 'row',
        },
        footerTitleText: {
            color: 'white',
            fontSize: 16
        },
        footerDescriptionText: {
            marginLeft: 10,
            fontSize: 18,
            fontWeight: 'bold',
            color: 'white'
        },
        statementContainer: {
            flex: 1,
            marginVertical: 20,
            marginHorizontal: 20
        },
        statementTitle: {
            marginBottom: 20
        },
        statementTitleText: {
            fontSize: 17,
            color: 'black',
            opacity: 0.7,
            fontWeight: 'bold'
        },
        statementItemContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottomWidth: 1,
            borderBottomColor: '#bfbfbf'
        },
        transactionTypeContainer: {
            marginVertical: 10
        },
        transactionTypeText: {
            fontWeight: 'bold',
            fontSize: 16,
            marginBottom: 5
        },
        transactionDateText: {
            fontSize: 16,
            color: '#2F4F4F'
        },
        amountContainer: {
            flexDirection: 'row',
            alignItems: 'center'
        },
        amountText: {
            fontSize: 16,
            fontWeight: 'bold'
        },
        iconNext: {
            marginHorizontal: 10,
            width: 15,
            height: 15
        },
        filterContainer: {
            backgroundColor: 'white',
            paddingHorizontal: 20,
            paddingVertical: 10,
            alignSelf: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderRadius: 20,
            bottom: 20,
            elevation: 10,
            borderWidth: 1,
            borderColor: 'rgba(158, 150, 150, .5)'
        },
        filterText: {
            fontSize: 16
        },
        iconFilter: {
            marginLeft: 10,
            width: 20,
            height: 20
        },
        modalMajorContainer: {
            backgroundColor: 'rgba(0,0,0,0.7)',
            width: deviceWidth,
            height: deviceHeight,
            alignItems: 'center',
            justifyContent: 'center'
        },
        modalContainer: {
            width: filterPopUpWidth,
            backgroundColor: 'white',
            borderWidth: 1,
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'center',
            position: 'absolute',
            justifyContent: 'center',
            borderRadius: 10,
            borderColor: "#bfbfbf"
        },
        filterItemContainer: {
            width: filterPopUpWidth,
            paddingVertical: 10,
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomWidth: 1,
            borderRadius: 10,
            borderColor: '#bfbfbf'
        },
        filterItemTitleText: {
            alignSelf: 'center',
            fontSize: 18,
            fontWeight: 'bold',
            marginVertical: 10
        },
        filterNameText: {
            fontSize: 16
        },
        cancelFilterContainer: {
            width: filterPopUpWidth,
            backgroundColor: "red",
            paddingVertical: 10,
            alignItems: 'center',
            borderRadius: 10
        },
        cancelText: {
            fontSize: 16,
            color: 'white',
            fontWeight: 'bold',
            
        }
    })
)