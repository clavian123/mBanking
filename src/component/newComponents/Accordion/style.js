import { StyleSheet } from "react-native";

export default (
  styles = StyleSheet.create({
    accordion: {
      width: "100%",
      backgroundColor: "#ff0066",
      paddingHorizontal: 20
    },
    header: {
      height: 120,
      flexDirection: "row",
      alignItems: "center"
    },
    headerSub: {
      height: 80,
      width: 80,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "white",
      borderRadius: 20,
      marginLeft: 15,
      elevation: 5
    },
    headerImage: {
      height: 60,
      width: 60
    },
    headerSub2: {
      height: 80,
      marginLeft: 15,
      justifyContent: "space-around"
    },
    headerTitleText: {
      color: "white",
      fontSize: 16,
      fontWeight: "500"
    },
    headerButton: {
      width: 120,
      flexDirection: "row",
      justifyContent: "center",
      backgroundColor: "#ff66a3",
      borderRadius: 20,
      paddingVertical: 5
    },
    headerButtonText: {
      color: "white",
      fontSize: 12,
      fontWeight: "500",
      textAlignVertical: "center"
    },
    headerButtonImage: {
      height: 25,
      width: 25,
      tintColor: "white"
    },
    bodyContainer: {
      width: "100%",
      paddingVertical: 20,
      borderTopWidth: 1,
      borderColor: "white"
    },
    bodyContent: {
      height: 110,
      justifyContent: "space-between",
      marginHorizontal: 15
    },
    bodyContentSub: {
      flexDirection: "row",
      justifyContent: "space-between"
    },
    bodyContentText1: {
      color: "white",
      fontWeight: "500"
    },
    bodyContentText2: {
      color: "white",
      fontWeight: "bold"
    }
  })
);