import React from 'react'

import {
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native'

import styles from './AccountCardStyle'

import {
    numberWithDot
} from '../../../generalFunction'

import iconShowBalance from "../../../../assets/icon-show-balance.png"
import iconHideBalance from "../../../../assets/icon-hide-balance.png"
import iconNext from "../../../../assets/icon-next.png"

export default class AccountCard extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            hiddenBalance: true
        }
    }

    handleHideBalance = () => {
        if(this.state.hiddenBalance) {
            this.setState({ hiddenBalance: false })
        } else {
            this.setState({ hiddenBalance: true })
        }
    }

    handleTouchCard = () => {
        if(this.state.hiddenBalance) {
            this.setState({ hiddenBalance: false })
        } else {
            const { navigation } = this.props
            navigation.navigate("Statement", {
                account: this.props.account
            })
        }
    }
    
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Simas Gold</Text>
                    <TouchableOpacity onPress = {() => {this.handleHideBalance()}}>
                        <Image source={this.state.hiddenBalance ? iconShowBalance : iconHideBalance} style={styles.headerIcon}/>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={()=> {this.handleTouchCard()}}>
                        <View>
                            <View style={styles.balanceContainer}>
                                <Text style={this.state.hiddenBalance ? {...styles.balanceText, fontSize: 18} : styles.balanceText}>{this.state.hiddenBalance ? "Your balance is hidden" : "IDR " + numberWithDot(parseFloat(this.props.accountBalance))}</Text>
                            </View>
                            <View style={styles.footer}>
                                <View>
                                    <Text style={styles.footerTitleText}>Account Number</Text>
                                    <Text style={styles.footerDescriptionText}>{this.props.accountNumber}</Text>
                                </View>
                                <View>
                                    <Image source={iconNext} style={styles.iconNext}/>
                                </View>
                            </View>

                        </View>
                    </TouchableOpacity>
            </View>
        )
    }

}