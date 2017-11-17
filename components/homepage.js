//React and all his friends
import React, {Component} from 'react';
import {Alert, Button, Text, TouchableOpacity, View, AsyncStorage} from 'react-native';
import {Actions} from 'react-native-router-flux';
//Styles
import styles from '../Style'

class HomePage extends Component {

    static navigationOptions = {
        title: 'HomePage',
    };

    getTests() {
        AsyncStorage.getItem('id_token').then((token) => {
            fetch('https://hiptest.net/api/projects/66117/scenarios/1299054', {
                method: 'GET',
                headers: { 'Authorization': 'Bearer ',
                    'Accept': 'application/vnd.api+json; version=1',
                    'Content-Type': 'application/json; charset=utf-8',
                    'access-token': 'ftqjCs27iy5gg-yocxO6gg',
                    'token-type': 'Bearer',
                    'client': '5H0bDQTQm3FB8pEBpZkEyw',
                    'expiry': '1542450299',
                    'uid': 'sammyloudiyi@gmail.com'}
            })
                .then((response) => response.text())
                .then((quote) => {
                    Alert.alert('Chuck Norris Quote', quote)
                })
                .done();
        })
    }

    async userLogout() {
            try {
                await AsyncStorage.removeItem('id_token');
                Alert.alert('Logout Success!');
                Actions.Authentication();
            } catch (error) {
                console.log('AsyncStorage error: ' + error.message);
            }
        }

    render() {
        return (
            <View style={styles.container}>

                <TouchableOpacity style={styles.buttonWrapper} onPress={this.getTests()}>
                    <Text style={styles.buttonText}> RECHERCHE DE TRUCS </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonWrapper} onPress={this.userLogout}>
                    <Text style={styles.buttonText} > Log out </Text>
                </TouchableOpacity>

                <Button onPress={this.userLogout} title="LOG OUT" />

             </View>
        );
    }
}

export default HomePage;

/*getTests() {
    AsyncStorage.getItem('id_token').then((token) => {
        fetch('https://hiptest.net/api/projects/63071/scenarios', {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + token }
        })
            .then((response) => response.text())
            .then((quote) => {
                Alert.alert('Chuck Norris Quote', quote)
            })
            .done();
    })
}*/