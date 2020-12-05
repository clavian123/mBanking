import React from 'react'

import {
    View,
    Text,
    TouchableOpacity
} from 'react-native'

import styles from "./AccountTabItemStyle"

class AccountTabItem extends React.Component {

    handlePress = () => {
        this.props.setSelectedTab(this.props.name)
    }

    render() {
        return(
            <TouchableOpacity onPress={() => {this.handlePress()}} style={this.props.selectedTab == this.props.name ? {...styles.container, borderBottomColor: 'red', borderBottomWidth: 3} : styles.container}>
                <Text style={this.props.selectedTab == this.props.name ? {...styles.text, fontWeight: 'bold'} : styles.text}>{this.props.name}</Text>
            </TouchableOpacity>
        )
    }

}

export default AccountTabItem