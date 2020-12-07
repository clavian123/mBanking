import React from 'react'

import {
    View,
    Image,
    Text,
    TouchableOpacity
} from 'react-native'

import styles from './MerchantItemStyle'

import {
    connect
} from 'react-redux'

import { 
    setMerchantCode
} from '../../../newFunction/paymentFunction'

class MerchantItemIndex extends React.Component {

    constructor(props) {
        super(props)
    }

    icon = () =>{
        if(this.props.name == "Go-pay") {
            return require("../../../../assets/icon-go-pay.jpg")
        } else if(this.props.name == "OVO") {
            return require("../../../../assets/icon-ovo.png") 
        } else {
            return require("../../../../assets/icon-tokopedia.png")
        }
    }

    handlePayment = async() => {
        const { navigation } = this.props;
        await this.props.dispatch(setMerchantCode(this.props.code, this.props.name));
        navigation.navigate('SetPhoneNumber', {
            merchant: this.props.name,
            code: this.props.code
        })
    }

    render() {
        return (
            <TouchableOpacity onPress={() => {this.handlePayment()}} style={styles.container}>
                <View style={styles.iconContainer}>
                    <Image style={styles.icon} source={this.icon()}/>
                    <Text>{this.props.name}</Text>
                </View>
            </TouchableOpacity>
        )
    }

}

const mapStateToProps = state => ({
    
})

export default connect(mapStateToProps)(MerchantItemIndex)