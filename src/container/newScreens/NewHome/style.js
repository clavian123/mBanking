import { StyleSheet } from "react-native";

export default (
  styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#e6e6e6"
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
    headerTitleSub: {
      width: 65,
      flexDirection: "row",
      justifyContent: "flex-end"
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
      justifyContent: "space-evenly",
      borderRadius: 10,
      elevation: 5
    },
    headerCardSideButton: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center"
    },
    headerCardSideButtonImage: {
      height: 45,
      width: 45
    },
    headerCardMainButton: {
      flex: 2,
      alignItems: "center",
      justifyContent: "center"
    },
    headerCardMainButtonSub: {
      height: "50%",
      alignItems: "center",
      justifyContent: "center"
    },
    headerCardMainButtonImage1: {
      height: 36,
      width: 36
    },
    headerCardMainButtonImage2: {
      height: 42,
      width: 42
    },
    headerCardButtonText: {
      fontWeight: "600"
    },
    line: {
      width: 1,
      marginVertical: 8,
      backgroundColor: "#b3b3b3"
    },
    payment: {
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
    paymentContent: {
      height: 180,
      flexDirection: "row",
      flexWrap: "wrap",
      alignContent: "space-around"
    },
    paymentContentButton: {
      height: 80,
      flexBasis: "25%",
      alignItems: "center",
      justifyContent: "space-between",
      padding: 5
    },
    paymentContentButtonSub: {
      height: "70%",
      alignItems: "center",
      justifyContent: "center"
    },
    paymentContentImage: {
      height: 50,
      width: 50,
      borderRadius: 10
    },
    paymentContentText: {
      fontSize: 12,
      fontWeight: "600"
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
);