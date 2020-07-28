import React, { Component } from 'react';
import{
    View,
    Text,
    TouchableOpacity,
    StyleSheet
}from 'react-native';

import { connect } from 'react-redux';

class EasyPinLogin extends Component{

    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <View style={styles.container}>
                
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        fontWeight: '500',
        flex: 1,
        backgroundColor: 'red'
    }
})

const mapStateToProps = state => ({
    customerApps: state.register.customerApps,
    username: state.register.username
});

export default connect(mapStateToProps)(EasyPinLogin);