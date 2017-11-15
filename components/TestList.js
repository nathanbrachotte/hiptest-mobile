/**
 * Created by nathanbrachotte on 15/11/17.
 */
import React from 'react';
import {Text, View, Button } from 'react-native';
import styles from '../Style'

export default class TestList extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <View style={styles.container}>
                <Text>lorem ipsum</Text>
            </View>
        );
    }
}