import React from 'react';
import{
    View,
    TextInput,
    Text,
    StyleSheet,
    Image,
    CheckBox,
    TouchableOpacity,
    ScrollView,
}from 'react-native';

import {numberWithCommas} from '../../generalFunction'

class SetAmount extends React.Component{

    constructor(props){
        super(props)
        this.state={
            amount: '',
            description: ''
        }
    }

    handleSelectAccount = () => {
        const{ navigation } = this.props;
        navigation.navigate('SelectSource');
    }

    render(){

        const { params } = this.props.route
        console.log(params);
        

        return(
            <ScrollView style={styles.container}>
                <View style={styles.setAmountLabelContainer}>
                    <View style={styles.rpIconContainer}>
                        <Text style={styles.rpIconText}>Rp</Text>
                    </View>
                    <Text style={styles.setAmountText}>Set the amount</Text>
                </View>

                <View style={styles.amountInputContainer}>
                    <Text style={styles.rpInputText}>Rp</Text>
                    <TextInput 
                        keyboardType={"numeric"}
                        style={styles.amountInput}
                        placeholder="0" 
                        onChangeText={(amount) => this.setState({amount:amount})}/>
                    <Image style={styles.pencilIcon} source={require('../../../assets/icon-pencil.png')} />
                </View>

                <View style={styles.scheduleTransferContainer}>
                    <CheckBox />
                    <Text style={styles.scheduleTranferText}>Schedule transfer</Text>
                </View>

                <View style={styles.line}/>

                <View style={styles.selectSourceContainer}>
                    <View style={styles.walletIconContainer}>
                        <Image style={styles.walletIcon} source={require('../../../assets/icon-wallet.png')}/>
                    </View>
                    <Text style={styles.selectSourceText}>Select source account</Text>
                </View>

                <TouchableOpacity onPress={this.handleSelectAccount} style={styles.selectSourceContainer2}>
                    <Text style={styles.selectSourceText2}>Select source account</Text>
                    <Image style={styles.moreIcon} source={require('../../../assets/icon-more.png')}/>
                </TouchableOpacity>

                {
                    params ? 
                    <View style={{...styles.sourceAccountDetailContainer, height: params ? null : 0}}>
                        <Text style={styles.sourceAccountDetailTitle}>{params.sourceAccNumber}</Text>
                        <Text>{params.sourceAccName.toUpperCase()}</Text>
                        <Text>{params.sourceAccType}</Text>
                        <Text style={{fontWeight: 'bold'}}>Balance: Rp {numberWithCommas(params.sourceAccBalance)}</Text>
                    </View>
                    : null
                }

                <View style={styles.line}/>

                <Text style={styles.additionalText}>Additional information (optional)</Text>

                <TextInput
                    placeholder="Description"
                    style={styles.descriptionInput}
                    onChangeText={(description) => this.setState({description:description})}/>

                <TouchableOpacity onPress={this.handleNext} style={styles.nextButton}>
                        <Text style={styles.nextText}>NEXT</Text>
                </TouchableOpacity>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white'
    },
    setAmountLabelContainer: {
        flexDirection: 'row',
        marginHorizontal: 20,
        marginVertical: 20
    },
    rpIconContainer:{
        backgroundColor: '#FA8072',
        width: 35,
        height: 35,
        borderRadius: 50
    },  
    rpIconText: {
        fontSize: 16,
        textAlign: 'center',
        marginVertical: 5,
        color: 'white',
        fontWeight: 'bold'
    },  
    setAmountText: {
        fontSize: 21,
        paddingVertical: 5,
        marginHorizontal: 10
    },
    amountInputContainer: {
        flexDirection: 'row',
        marginHorizontal: 20
    },
    rpInputText:{
        fontSize: 21,
        fontWeight: 'bold',
        position: 'absolute',
        left: 10,
        marginVertical: 10
    },
    amountInput:{
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        width: '100%',
        borderWidth: 1,
        borderColor: '#888888',
        borderRadius: 5
    },
    pencilIcon: {
        width: 20,
        height: 20,
        resizeMode: 'stretch',
        position: 'absolute',
        right: 10,
        marginVertical: 15
    },
    scheduleTransferContainer:{
        marginHorizontal: 20,
        flexDirection: 'row',
        marginVertical: 10
    }, 
    scheduleTranferText:{
        fontSize: 16,
        marginVertical: 5
    },
    line:{
        width: '100%',
        height: 1,
        backgroundColor: '#dedede',
        marginVertical: 20
    },
    selectSourceContainer:{
        flexDirection: 'row',
        marginHorizontal: 20
    },
    walletIconContainer:{
        backgroundColor: 'red',
        borderRadius: 50,
        width: 35,
        height: 35
    },
    walletIcon:{
        tintColor: 'white',
        width: 20,
        height: 20,
        alignSelf: 'center',
        marginVertical: 7
    },
    selectSourceText:{
        fontSize: 20,
        marginVertical: 5,
        marginHorizontal: 10
    },
    selectSourceContainer2: {
        marginHorizontal: 20,
        flexDirection: 'row',
        marginVertical: 20
    },
    selectSourceText2:{
        fontSize: 16
    },
    moreIcon: {
        width: 15,
        height: 15,
        resizeMode: 'stretch',
        position: 'absolute',
        right: 10,
        marginVertical: 2
    },
    additionalText: {
        fontSize: 16,
        marginHorizontal: 20
    },
    descriptionInput: {
        marginVertical: 20,
        marginHorizontal: 20,
        width: '90%',
        borderBottomWidth: 1,
        borderBottomColor: '#888888',
        fontSize: 16
    },
    nextButton: {
        height: 50,
        width: '90%',
        backgroundColor: 'red',
        borderRadius: 30,
        marginHorizontal: 20,
        marginBottom:10
    },
    nextText: {
        textAlign: 'center',
        paddingVertical: 15,
        fontSize: 16,
        color: 'white'
    },

    sourceAccountDetailContainer:{
        width: '90%',
        alignSelf: 'center'
    },

    sourceAccountDetailTitle:{
        fontWeight: 'bold',
        fontSize: 17
    },

})

export default SetAmount;
