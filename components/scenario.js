//React and all his friends
import React, {Component} from 'react';
import {Alert, Button, Text, TouchableOpacity, View, AsyncStorage} from 'react-native';
//Styles
import styles from '../Style'

class Scenario extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: ""
        };
    }

    static navigationOptions = {
        title: 'Scenario',
    };

    getTests() {
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
                        this.setState(response.data[i].attributes.name);
                        console.log(response.data[i].attributes.name);
                    }
                })
                .done();
        })
    }
/*
    DisplayScenario() {
        for (i = 0; i < this.state.scenario.length; i++)
        {
            console.log(this.state.scenario.length);
            return (
                <View>
                    <Text>{this.state.scenario}</Text>
                </View>
            );
        }
    }
*/
    render() {
        return (
            <View style={styles.container}>
                <Text>
                Ici on affiche le premier scenario
                </Text>
                <View>
                    <Text>
                        coucou
                    </Text>
                </View>
            </View>
        );
    }
}

export default Scenario;
