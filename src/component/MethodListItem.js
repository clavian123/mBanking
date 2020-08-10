import React from 'react';
import{
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image
} from 'react-native';

import { setSendMethod } from '../action/transfer/transferAction';
import { connect } from 'react-redux';
import { numberWithDot } from '../generalFunction';

class MethodListItem extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            selected: false
        }
    }

    renderRadioButton = () => {
        const { sendMethod } = this.props;
        if(sendMethod.id == this.props.id){
            return(
                <View>
                    <Image style={styles.radioIcon} source={require('../../assets/icon-radio.png')}/>
                </View>
            ) 
        }else{
            return(
                <View>
                    <Image style={styles.dotIcon} source={require('../../assets/icon-dot.png')}/>
                </View>
            )
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
                    <Text>Rp {numberWithDot(this.props.fee)}</Text>
                </View>
            )
        }
    }

    onPress = () =>{
        this.props.dispatch(setSendMethod(this.props.id, this.props.name, this.props.fee));
    }

    render(){
        return(
            <TouchableOpacity style={styles.container} onPress={this.onPress}>
                {this.renderRadioButton()}
                <Text style={styles.title}>{this.props.name}</Text>
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
        fontWeight: 'bold'
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