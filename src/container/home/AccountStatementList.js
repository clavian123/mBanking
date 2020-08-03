import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Animated,
    Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import { numberWithCommas } from '../../generalFunction'
import StatementList from '../../component/StatementList';
import AccountCard from '../../component/AccountCard';
import Loading from '../../Loading';

headerMaxHeight = 230
headerMinHeight = 180


class AccountStatementList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            scrollY: new Animated.Value(0),
            statements: [],
        }
    }

    componentDidMount(){
        this._isMounted = true;
        this.getStatements();
    }

    getStatements = () => {
        const { params } = this.props.route
        var statements = this.props.statements ? this.props.statements.filter((item) => item.accountNumber == params.accNumber) : this.state.statements
        if (statements.length != 0) {
            statements[0].statements.forEach(item => {
                this.setState(previous => ({
                    statements: [...previous.statements, item]
                }))
            })
        }
    }

    render() {
        // console.log(this.props.route.params);
        const { params } = this.props.route
        const windowHeight = Dimensions.get('window').height;

        const headerHeight = this.state.scrollY.interpolate({
            inputRange: [0, headerMaxHeight - headerMinHeight],
            outputRange: [headerMaxHeight, headerMinHeight],
            extrapolate: 'clamp',
        })

        const headerOpacity = this.state.scrollY.interpolate({
            inputRange: [0, headerMaxHeight-headerMinHeight],
            outputRange: [1, 0],
            extrapolate: 'clamp'
        })

        const headerZIndex = this.state.scrollY.interpolate({
            inputRange: [0, headerMaxHeight-headerMinHeight],
            outputRange: [0, 1],
            extrapolate: 'clamp'
        })

        const headerTitleOpacity = this.state.scrollY.interpolate({
            inputRange: [0, headerMaxHeight-headerMinHeight],
            outputRange: [0, 1],
            extrapolate: 'clamp'
        })

        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <Animated.View style={{
                    ...styles.header,
                    height: headerHeight,
                    zIndex: headerZIndex,
                    alignItems: 'center',
                }}>
                    <Animated.View style={{...styles.headerTextContainer, opacity: headerTitleOpacity}}>
                        <Text style={styles.headerTextAccountType}>Tabunganku</Text>
                        <Text style={styles.headerTextBalance}>IDR {numberWithCommas(params.balance)}</Text>
                        <View style={styles.headerTextAccountNumberContainer}>
                            <Text style={styles.headerTextAccountNumberTitle}>Account Number: </Text>
                            <Text style={styles.headerTextAccountNumberValue}>{params.accNumber}</Text>
                        </View>
                        
                    </Animated.View>
                </Animated.View>
                <ScrollView
                    scrollEventThrottle={16}
                    overScrollMode={'never'}
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }])}>
                    
                    <Animated.View style={{
                        ...styles.accountCardContainer,
                        height: headerHeight,
                        marginTop: 10,
                        // opacity: headerOpacity
                    }}>
                        <AccountCard accNumber={params.accNumber} balance={params.balance}></AccountCard>
                    </Animated.View>
                    
                    <StatementList statements={this.state.statements.reverse()} />
                    {/* <View style={{ height: 1000 , backgroundColor: 'blue'}}></View> */}
                </ScrollView>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#c10000',
        position: 'absolute',
        height: 220,
        left: 0,
        right: 0,
    },

    headerTextContainer:{
        position: 'absolute',
        top: 10,
        bottom: 20, 
        flex: 1,
        width: '80%',
        alignItems: 'center'
    },

    headerTextAccountType: {
        width: '90%',
        color: 'white',
        marginVertical: 10
    },

    headerTextBalance: {
        width: '90%',
        color: 'white',
        fontSize: 25,
        // backgroundColor:'black',
        marginVertical: 10
    },

    headerTextAccountNumberContainer: {
        width: '90%',
        flexDirection: 'row',
    },

    headerTextAccountNumberTitle: {
        color: 'white',
    },

    headerTextAccountNumberValue: {
        color: 'white',
        fontSize: 17
    },
})

const mapStateToProps = state => ({
    // accNumber: state.login.accNumber,
    statements: state.home.statements,
    loading: state.home.loading
});

export default connect(mapStateToProps)(AccountStatementList);