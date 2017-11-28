//React and all his friends
import React, {Component} from 'react';
import {Alert, Button, Text, TouchableOpacity, View, AsyncStorage, Keyboard, StyleSheet} from 'react-native';
import {Actions} from 'react-native-router-flux';
//Styles
import styles from '../Style'

class HomePage extends Component {

    constructor(props) {
        super(props);
        Keyboard.dismiss();
        this.state = {
        };
    }

    static navigationOptions = {
        title: 'HomePage',
    };

    getProject() {
        AsyncStorage.getItem('id_token').then((token) => {
            fetch('https://hiptest.net/api/projects/31812/scenarios', {
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
                .then((response) => response.json())
                .then(function(response){
                    console.log(response.data.length);
                    for (i = 0; i < response.data.length; i++)
                    {
                        //this.setState(response.data[i].attributes.name);
                        console.log(response.data[i].attributes.name);
                    }
                    })
                .done();
        })
    }
    goToScenario()
    {
       Actions.Scenario();

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
                <Text style={styles.title}> Choose your project </Text>

                <View style={styles.body}>
                    <TouchableOpacity style={styles.button} onPress={this.goToScenario}>
                         <Text style={styles.buttonText}> GO TO SCENARIO </Text>
                    </TouchableOpacity>



                    <TouchableOpacity style={styles.button} onPress={this.userLogout}>
                        <Text style={styles.buttonText} > Log out </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default HomePage;
