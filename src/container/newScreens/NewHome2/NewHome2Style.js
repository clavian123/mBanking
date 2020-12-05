import { StyleSheet } from 'react-native'

export default (
    styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#e6e6e6'
        },
        header: {
            height: 160,
            width: "100%",
            backgroundColor: "#ff0066",
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            paddingHorizontal: 20
        },
        headerTitle: {
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 50
        },
        headerTitleText: {
            color: "white",
            fontSize: 16,
            fontWeight: "bold"
        },
        headerTitleButton: {
            height: 26,
            width: 26
        },
        headerTitleButtonImage: {
            height: "100%",
            width: "100%",
            tintColor: "white"
        },
        headerCard: {
            height: 80,
            width: "100%",
            position: "absolute",
            top: "75%",
            backgroundColor: "white",
            flexDirection: "row",
            alignSelf: "center",
            justifyContent: "center",
            alignItems: 'center',
            borderRadius: 10,
            elevation: 5
        },
        bankAccountContainer: {
            flexDirection: 'row',
            alignItems: 'center'
        },
        bankAccountIcon: {
            height: 50,
            width: 50
        },
        bankAccountText: {
            fontSize: 16
        },
        paymentContainer: {
            marginTop: 75,
            marginHorizontal: 20,
            paddingHorizontal: 20,
            paddingVertical: 15,
            backgroundColor: "white",
            borderRadius: 10,
            elevation: 5
        },
        paymentTitleText: {
            fontWeight: "bold",
            fontSize: 16,
            marginBottom: 5
        },
        bankingSummaryButton: {
            height: 90,
            marginVertical: 35,
            marginHorizontal: 20,
            justifyContent: "center",
            backgroundColor: "#ff0066",
            borderRadius: 10,
            elevation: 5
          },
          bankingSummaryButtonSub: {
            marginHorizontal: 10,
            flexDirection: "row",
            alignItems: "center"
          },
          bankingSummaryButtonImage: {
            height: 80,
            width: 80,
            tintColor: "white"
          },
          bankingSummaryButtonSub2: {
            height: 80,
            justifyContent: "center"
          },
          bankingSummaryButtonTitleText: {
            marginBottom: 3,
            color: "white",
            fontSize: 16,
            fontWeight: "bold"
          },
          bankingSummaryButtonDetailText: {
            color: "white",
            fontSize: 12,
            fontWeight: "500"
          }
    })
)