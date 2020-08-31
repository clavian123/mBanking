import React, { Component } from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  View,
} from 'react-native'

export default class Loading extends Component {
  render() {
    return (
      <View style={{...styles.container, backgroundColor: this.props.transparent ? "rgba(0, 0, 0, 0.5)" : null}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  },
})
