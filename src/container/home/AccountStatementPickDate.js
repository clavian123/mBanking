import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableHighlight,
    Platform,
    Dimensions,
    Button,
    TouchableOpacity,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default class AccountStatementPickDate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date(),
            endDate: new Date(),
            showDatePicker: false,
            datePickerFocus: '',
            width: Dimensions.get('window').width,
        };
    }

    setStartDate = (event, startDate) => {
        startDate = startDate || this.state.startDate;

        this.setState({
            showDatePicker: Platform.OS === 'ios' ? true : false,
            startDate,
        });
    }

    setEndDate = (event, endDate) => {
        endDate = endDate || this.state.endDate;

        this.setState({
            showDatePicker: Platform.OS === 'ios' ? true : false,
            endDate,
        });
    }

    show = () => {
        this.setState({
            showDatePicker: true,
        })
    }

    datePicker = () => {
        this.show();
    }

    handlePickerClick = (pickerType) => {
        this.setState({
            datePickerFocus: pickerType,
        });
        this.datePicker();
    }

    handleViewStatement = () => {
        const { startDate, endDate } = this.state;
        var moment = require('moment');
        this.props.navigation.navigate('AccountStatementDetail', {
            startDate: moment(startDate).format('YYYY-MM-DD'),
            endDate: moment(endDate).format('YYYY-MM-DD')
        });
    }

    render() {
        const { showDatePicker, startDate, endDate, datePickerFocus } = this.state;
        var moment = require('moment');
        const styles = StyleSheet.create({
            container: {
                width: "100%",
                height: "100%",
            },
            viewTitle: {
                flex: 2,
                justifyContent: "center",
            },
            viewDetail: {
                flex: 5,
                width: this.state.width - 60,
                alignSelf: "center",
                paddingHorizontal: 30,
                paddingVertical: 20,
            },
            viewSubDetail: {
                marginVertical: 10,
            },
            buttonPickDate: {
                backgroundColor: 'lightgray',
                padding: 10,
                borderRadius: 10,
            },
            textTitle: {
                fontWeight: 'bold',
                fontSize: 20,
                textAlign: 'center',
            },
            textLabelTitle: {
                fontSize: 12,
            },
            textDate: {
                fontSize: 14,
            },
            textViewStatement: {
                fontSize: 15,
            },
            button: {
                backgroundColor: '#1c313a',
                marginVertical: 15,
                borderRadius: 10,
                paddingVertical: 16,
            },
            buttonText: {
                fontSize: 16,
                fontWeight: '500',
                color: '#ffffff',
                textAlign: 'center',
            },
        });
        return (
            <View style={styles.container}>
                <View style={styles.viewTitle}>
                    <Text style={styles.textTitle}>Statement Period</Text>
                </View>
                <View style={styles.viewDetail}>
                    <View style={styles.viewSubDetail}>
                        <Text style={styles.textLabelTitle}>Start Date</Text>
                        <TouchableHighlight underlayColor="rgb(230, 230, 230)" style={styles.buttonPickDate} onPress={() => { this.handlePickerClick("start") }}>
                            <Text style={styles.textDate}>{moment(startDate).format('DD MMMM YYYY')}</Text>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.viewSubDetail}>
                        <Text style={styles.textLabelTitle}>End Date</Text>
                        <TouchableHighlight underlayColor="rgb(230, 230, 230)" style={styles.buttonPickDate} onPress={() => { this.handlePickerClick("end") }}>
                            <Text style={styles.textDate}>{moment(endDate).format('DD MMMM YYYY')}</Text>
                        </TouchableHighlight>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={() => this.handleViewStatement()}>
                        <Text style={styles.buttonText}>View Statement</Text>
                    </TouchableOpacity>
                </View>
                {showDatePicker && <DateTimePicker
                    value={datePickerFocus === 'start' ? startDate : endDate}
                    mode='date'
                    display="default"
                    onChange={datePickerFocus === 'start' ? this.setStartDate : this.setEndDate}
                />}
            </View>
        );
    }

}

