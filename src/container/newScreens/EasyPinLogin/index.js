import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  ToastAndroid,
  Alert,
  TouchableHighlight
} from "react-native";
import { connect } from "react-redux";

import styles from "./style";
import iconKeyboard from "../../../../assets/icon-keyboard.png";

class EasyPinLogin extends React.Component {

  state = {
    pin: ""
  };

  handleResetEasyPin = () => {
    Alert.alert(
      "Clear Mobile Banking Data",
      "Thiw will clear Mobile Banking data on your device, are you sure?",
      [
        {
          text: "YES, CLEAR NOW",
          onPress: () => {
            this.props.dispatch(handleLogout());
          }
        },
        {
          text: "CANCEL"
        }
      ]
    )
  };

  handleContinue = () => {
    const { easyPin, navigation } = this.props;
        if(this.state.pin != easyPin){
          ToastAndroid.show("Please enter a valid EasyPIN", ToastAndroid.CENTER);
        }else{
            navigation.navigate('HomeTab')
        }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.labelContainer}>
          <Text style={styles.labelText}>
            <Text>EasyPIN Login</Text>
          </Text>
          <Image
            style={styles.keyboardIcon}
            source={iconKeyboard}
          />
        </View>
        <Text style={styles.descriptionText}>Enter your 6 digit secure code</Text>
        <TextInput
          style={styles.input}
          selectionColor="#FFFFFF"
          keyboardType="number-pad"
          maxLength={6}
          secureTextEntry={true}
          onChangeText={(pin) => this.setState({ pin })}
        />
        <Text style={styles.remindText1}>
          Your account will be blocked after 3 incorrect attempts
        </Text>
        <View style={styles.resetContainer}>
          <Text style={styles.remindText2}>Have login problem? </Text>
          <TouchableHighlight
            onPress={this.handleResetEasyPin}
          >
            <Text style={styles.resetButton}>Reset EasyPIN</Text>
          </TouchableHighlight>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={this.handleContinue}
        >
          <Text style={styles.buttonText}>CONTINUE</Text>
        </TouchableOpacity>
      </View>
    );
  };
};

const mapStateToProps = state => ({
  easyPin: state.login.easyPin,
  skip: state.register.skip
});

export default connect(mapStateToProps)(EasyPinLogin);