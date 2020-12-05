import { StyleSheet } from 'react-native'

export default (
    styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: 'white'
        },
        headerContainer: {
            backgroundColor: "#ff0066",
            height: 100,
            justifyContent: 'center',
            marginBottom: 10,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            elevation: 10
        },
        headerTitleContainer: {
            flexDirection: 'row'
        },
        bankAccountIconContainer: {
            marginLeft: 30,
            backgroundColor: 'white',
            width: 60,
            height: 60,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10
        },
        bankAccountIcon: {
            width: 50,
            height: 50
        },
        headerTitleTextContainer: {
            marginLeft: 20
        },
        headerTitleText: {
            fontSize: 20,
            color: 'white',
            marginBottom: 5
        },
        headerButton: {
            backgroundColor: '#ff66a3',
            flexDirection: 'row',
            borderRadius: 10,
            alignItems: 'center',
            width: '60%',
            justifyContent: 'center',
            paddingVertical: 3
        },
        headerButtonText: {
            color: 'white',
            fontWeight: 'bold'
        },
        arrowIcon: {
            tintColor: 'white',
            width: 22,
            height: 22
        },
        detailContainer: {
            marginHorizontal: 20
        },
        underline: {
            borderBottomColor: 'white',
            borderBottomWidth: 1,
            marginVertical: 20
        },
        savingsDetail: {
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        savingsText: {
            fontSize: 16,
            color: 'white'
        },
        savingsSumText: {
            fontSize: 16,
            color: 'white',
            fontWeight: 'bold'
        }
    })
)