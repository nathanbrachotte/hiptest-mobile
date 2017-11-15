/**
 * Created by nathanbrachotte on 14/11/17.
 */
import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import styles from '../Style'

export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = { text: 'Search here' };
    }

    render() {
        return (
            <View style={styles.container}>
            <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                onChangeText={(text) => this.setState({text})}
                value={this.state.text}
            />
            </View>
        );
    }
}
