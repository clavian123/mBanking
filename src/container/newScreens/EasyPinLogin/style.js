import { StyleSheet } from "react-native";

export default (
  styles = StyleSheet.create({
    container: {
      alignItems: "center",
      fontWeight: "500",
      flex: 1,
      backgroundColor: "#ff0066"
    },
    labelContainer: {
      flexDirection: "row",
      marginHorizontal: 20,
      marginVertical: 40,
      width: "80%",
      alignItems: "center"
    },
    labelText: {
      fontSize: 24,
      color: "white",
      fontWeight: "bold"
    },
    descriptionText: {
      marginVertical: 20,
      marginHorizontal: 20,
      width: "80%",
      color: "white"
    },
    input: {
      fontSize: 24,
      color: "white",
      borderBottomColor: "white",
      borderBottomWidth: 1,
      width: "80%",
      textAlign: "center",
      marginTop: 40,
      marginBottom: 15
    },
    keyboardIcon: {
      width: 50,
      height: 50,
      tintColor: "white",
      position: "absolute",
      right: 0
    },
    remindText1: {
      color: "white",
      width: "80%"
    },
    remindText2: {
      color: "white"
    },
    resetContainer: {
      flexDirection: "row",
      width: "80%",
      marginHorizontal: 20
    },
    resetButton: {
      textDecorationLine: "underline",
      color: "white",
      fontWeight: "bold"
    },
    button: {
      width: "90%",
      backgroundColor: "white",
      borderRadius: 30,
      paddingVertical: 10,
      position: "absolute",
      bottom: 20
    },
    buttonText: {
      fontSize: 16,
      textAlign: "center",
      color: "black"
    }
  })
);