import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert
} from 'react-native';

import { connect } from 'react-redux';

import {
  handleLogout
} from '../../newFunction/loginFunction'

class Account extends React.Component {

  static navigationOptions = {
    title: 'Accounts',
  };

  handleLogout = () => {
    const { deviceId } = this.props
    Alert.alert(  
      'Confirm Logout',  
      'Are you sure ?',  
      [  
          {
              text: 'Yes', 
              onPress: () => {
                this.props.dispatch(handleLogout(deviceId))
                clearInterval(window.activeInterval)
              } 
          }, 
          {  
              text: 'No',  
              style: 'cancel',  
          }
      ]  
    );  
  }

  handleMenuClicked = (navigateTo) => {
    const { navigate } = this.props.navigation;
    navigate(navigateTo);
  }

  render() {

    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.logoutContainer} onPress={() => { this.handleLogout() }}>
            <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>mBanking</Text>
        </View>
        <View style={styles.descriptionContainer}>
            <Text style={{fontSize: 18, textAlign: 'justify'}}>merupakan aplikasi mobile banking yang 
              dikembangkan oleh mahasiswa Universitas Bina Nusantara 
              guna memenuhi kebutuhan skripsi dan juga kebutuhan magang 
              pada perusahaan PT. BANK SINARMAS, TBK. dengan menggunakan framework React Native sebagai front-end
              dan framework Spring Boot sebagai back-end didukung dengan kemampuan stream processing dari platform
              Apache Kafka.
            </Text>
            <Text style={{fontSize: 18, textAlign: 'justify', marginTop: 20}}>
              Dikembangkan oleh:
            </Text>
            <Text style={{fontSize: 18, textAlign: 'justify', marginTop: 20}}>
              - Rian Krishandi
            </Text>
            <Text style={{fontSize: 18, textAlign: 'justify'}}>
              - Clavian Candrian
            </Text>
            <Text style={{fontSize: 18, textAlign: 'justify'}}>
              - Jun Chandra
            </Text>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: 'white',
    justifyContent: 'center'
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginVertical: 20
  },
  titleText: {
    fontSize: 21,
    fontWeight: 'bold'
  },
  logoutContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#ff0066',
    padding: 8,
    borderRadius: 5
  },
  logoutText: {
    fontSize: 18,
    color: 'white'
  },
  descriptionContainer: {
    marginHorizontal: 20,
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '500',
    color: 'white',
    textAlign: 'center'
  },
  button: {
    backgroundColor: '#ff0066',
    marginVertical: 10,
    borderRadius: 10,
    paddingVertical: 16,
    width: 300,
  },
});

const mapStateToProps = state => ({
  deviceId: state.newLogin.deviceId
})

export default connect(mapStateToProps)(Account);