/**
 * Created by nathanbrachotte on 15/11/17.
 */
import React from 'react';
import {Text, View, Button, TextInput } from 'react-native';
import styles from '../Style'

import TestList from './TestList'

export default class Connexion extends React.Component {

    constructor(props) {
        super(props);
        this.state = { text: 'Connexion' };
    }

    search() {
        //this.props.navigation.navigate('TestList');
        fetch('https://hiptest.net/api/auth/sign_in', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: 'nathan.brachotte@yahoo.fr',
                password: 'DarknessStudents',
            })
        })
    };

    render() {
        return (
            <View style={styles.container}>
                <Text>Username</Text>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text}
                />

                <Text>Password</Text>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text}
                />
                <Button onPress={()=> this.search()} style={styles.button} title={"IBRAHIM"}/>
            </View>
        );
    }
}
