/**
 * Created by nathanbrachotte on 15/11/17.
 */
import React from 'react';
import {Text, View, Button, TextInput } from 'react-native';
import styles from '../Style'


import TestList from './testList'

export default class Connexion extends React.Component {

    constructor(props) {
        super(props);
        this.state = { text: 'Connexion' };
    }

    search() {
        fetch('https://hiptest.net/api/auth/sign_in', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
                'access-token': '0hhfCEx42JraUl_I1ay-IQ',
                'token-type': 'Bearer',
                'client': 'DKP-HJu6xcwkAPiPZxoEpw',
                'expiry': '1486047985',
                'uid': 'nathan.brachotte@yahoo.fr'
            },
            body: JSON.stringify({
                email: 'nathan.brachotte@yahoo.fr',
                password: 'DarknessStudents',
            })
        }).then((response) => response.json())
            .then((responseData) => { console.log(responseData) });

        this.props.navigation.navigate('TestList');

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
