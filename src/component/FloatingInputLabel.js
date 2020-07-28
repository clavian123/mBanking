import React, { Component } from 'react';
import{
    View,
    Text,
    TextInput
}from 'react-native';

export default class FloatingInputLabel extends Component {
    state = {
      isFocused: false,
      placeholder: ""
    };
  
    handleFocus = () => this.setState({ isFocused: true, placeholder: this.props.hint });
    handleBlur = () => this.setState({ placeholder: "" }, this.handleNotNull);

    handleNotNull = () => {
      if(this.props.value != null){
        this.setState({ isFocused: true })
      }else{
        this.setState({ isFocused: false })
      }
    }
  
    render() {
      const { label, ...props } = this.props;
      const { isFocused } = this.state;
      const labelStyle = {
        position: 'absolute',
        left: 0,
        top: !isFocused ? 27 : 0,
        fontSize: !isFocused ? 14 : 14,
        color: !isFocused ? '#aaa' : '#000',
        paddingLeft: 5
      };
      return (
        <View style={{ marginLeft: 10, paddingTop: 18 }}>
          <Text style={labelStyle}>
            {label}
          </Text>
          <TextInput
            {...props}
            placeholder={this.state.placeholder}
            style={{...this.props.input, borderBottomColor: this.props.borderBottomColor, borderBottomWidth: this.props.borderBottomWidth}}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
          />
        </View>
      );
    }
  }