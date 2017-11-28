//React and all his friends
import React, {Component} from 'react';
import {AsyncStorage, Text, TextInput, TouchableOpacity, View, Alert} from 'react-native';
import {Actions} from 'react-native-router-flux';

import styles from '../Style';


class Authentication extends Component {

    constructor() {
        super();
        this.state = { username: null, password: null };
    }

    async saveItem(item, selectedValue) {
        try {
            await AsyncStorage.setItem(item, selectedValue);
        } catch (error) {
            console.error('AsyncStorage error: ' + error.message);
        }
    }

    userLogin() {
        if (!this.state.username || !this.state.password) return;
        // TODO: localhost doesn't work because the app is running inside an emulator. Get the IP address with ifconfig.
        fetch('https://hiptest.net/api/auth/sign_in', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
                'access-token': 'ftqjCs27iy5gg-yocxO6gg',
                'token-type': 'Bearer',
                'client': '5H0bDQTQm3FB8pEBpZkEyw',
                'expiry': '1542450299',
                'uid': 'sammyloudiyi@gmail.com'
            },
            body: JSON.stringify({
                email: 'sammyloudiyi@gmail.com',
                password: '123@456b78',
            })
        })
            .then((response) => response.json())
            .then((responseData) => {
                this.saveItem('id_token', responseData.id_token);
                //Alert.alert('Login Success!', 'Test your stuff now')
                Actions.HomePage();
            })
            .done();
    }

    render() {
        return (
            <View style={styles.container}>
                    <Text style={styles.title}> HipTest Mobile </Text>
                <View style={styles.body}>
                    <TextInput
                        editable={true}
                        onChangeText={(username) => this.setState({username})}
                        placeholder='Username'
                        ref='username'
                        returnKeyType='next'
                        style={styles.inputText}
                        value={this.state.username}
                    />
                    <TextInput
                        editable={true}
                        onChangeText={(password) => this.setState({password})}
                        placeholder='Password'
                        ref='password'
                        returnKeyType='next'
                        secureTextEntry={true}
                        style={styles.inputText}
                        value={this.state.password}
                    />

                    <TouchableOpacity style={styles.button} onPress={this.userLogin.bind(this)}>
                        <Text style={styles.buttonText}> Log In </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default Authentication;

/*    userLogin() {
        if (!this.state.username || !this.state.password) return;
        // dTODO: localhost doesn't work because the app is running inside an emulator. Get the IP address with ifconfig.
        fetch('https://hiptest.net/api/auth/sign_in', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
                'abccess-token': '0hhfCEx42JraUl_I1ay-IQ',
                'token-type': 'Bearer',
                'client': 'DKP-HJu6xcwkAPiPZxoEpw',
                'expiry': '1486047985',
                'uid': 'nathan.brachotte@yahoo.fr'
            },
            body: JSON.stringify({
                email: 'nathan.brachotte@yahoo.fr',
                password: 'DarknessStudents',
            })
        })
            .then((response) => response.json())
            .then((responseData) => {
                this.saveItem('id_token', responseData.id_token);
                Alert.alert('Login Success!', 'Test your stuff now')
                Actions.HomePage();
            })
            .done();
    }*/