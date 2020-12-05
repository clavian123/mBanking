import React from 'react';
import{
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image
} from 'react-native';

import { connect } from 'react-redux';

import {
    formatCurrency
} from '../utils/index'

import {
    setTransferMethod
} from '../newFunction/transferFunction'

class MethodListItem extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            source: require('../../assets/icon-dot.png'),
            style: styles.dotIcon,
            key: '../../assets/icon-dot.png'
        }
    }

    renderFeeText = (value) => {
        if(value == '0'){
            return (
                <View style={styles.freeContainer}>
                    <Text style={styles.freeText}>Free</Text>
                </View>
            )
        }else{
            return (
                <View style={styles.feeContainer}>
                    <Text style={styles.feeText}>Fee</Text>
                    <Text>{formatCurrency(this.props.fee)}</Text>
                </View>
            )
        }
    }

    static getDerivedStateFromProps(props, state) {
        if(props.selected === props.name) {
            return {
                source: require('../../assets/icon-radio.png'),
                style: styles.radioIcon,
                key: '../../assets/icon-radio.png'
            }
        } else {
            return {
                source: require('../../assets/icon-dot.png'),
                style: styles.dotIcon,
                key: '../../assets/icon-dot.png'
            }
        }
    }

    onPress = async(item) =>{
        this.props.handleSelected(item);
        await this.props.dispatch(setTransferMethod(this.props.name, this.props.fee));
    }

    render(){
        return(
            <TouchableOpacity style={styles.container} onPress={() => this.onPress(this.props.name)}>
                <View>
                    <Image style={ this.state.style } source={this.state.source} key={this.state.key}/>
                </View>
                <Text numberOfLines={2} style={styles.title}>{this.props.description}</Text>
                {this.renderFeeText(this.props.fee)}          
            </TouchableOpacity>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        marginHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#888888',
        borderBottomWidth: 1
    },
    dotIcon: {
        width: 20,
        height: 20,
        marginRight: 10
    },
    radioIcon:{
        width: 20,
        height: 20,
        tintColor: '#C10000',
        marginRight: 10
    },  
    title:{
        fontSize: 17,
        fontWeight: 'bold',
        width: '60%'
    },  
    feeContainer: {
        position: 'absolute',
        right: 0
    },
    feeText: {
        textAlign: 'right'
    },
    freeContainer: {
        backgroundColor: "#C10000",
        position: 'absolute',
        right: 0
    },
    freeText: {
        color: 'white',
        paddingHorizontal: 10,
        paddingVertical: 5,
        fontWeight: 'bold'
    }
});

const mapStateToProps = state => ({
    sendMethod: state.transfer.sendMethod
});

export default connect(mapStateToProps)(MethodListItem);