/**
 * Created by nathanbrachotte on 13/11/17.
 */
import React from 'react';
import {Text, View, Button } from 'react-native';
import styles from '../Style'

export default class About extends React.Component {


    search() {
        this.props.navigation.navigate('Search');
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>This app has been created by Nathan Brachotte (mostly)</Text>
                <Text>
                    Blablablablablab
                </Text>
                <Button onPress={()=> this.search()} style={styles.button} title={"IBRAHIM"}/>
            </View>
        );
    }
}
