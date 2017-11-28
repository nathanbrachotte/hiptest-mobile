//React and all his friends
import React, {Component} from 'react';
import {Alert, Button, Text, TouchableOpacity, View, AsyncStorage, ActivityIndicator, ListView } from 'react-native';
import {Actions} from 'react-native-router-flux';

//Styles
import styles from '../Style'

class Scenario extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
        };
    }

    static navigationOptions = {
        title: 'Scenario',
    };

    componentDidMount() {
        return fetch('https://hiptest.net/api/projects/31812/scenarios', {
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
            .then((responseJson) => {
                let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                this.setState({
                    isLoading: false,
                    dataSource: ds.cloneWithRows(responseJson.data),
                    nbElement:  (responseJson.data.length - 1),
                    num: (responseJson.data.length - 1),
                }, function() {
                    // do something with new state
                });
            })
            .catch((error) => {
                console.error(error);
            });
    };

    goToHomePage()
    {
        Actions.HomePage();

    }

    scenNumberNext(){
        if(this.state.num === 0){
            this.setState({isLoading: false,num: this.state.nbElement});
        }else{
            this.setState({isLoading: false,num: this.state.num-1});
        }
    };
    scenNumberPrev(){
        if(this.state.num === this.state.nbElement){
            this.setState({isLoading: false,num: 0});
        }else{
            this.setState({isLoading: false,num: this.state.num+1});
        }
    };
    render() {
        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, paddingTop: 20}}>
                    <ActivityIndicator />
                </View>
            );
        }

        return (
            <View style={styles.container}>
                <Text style={styles.title}> {this.state.dataSource.getRowData(0, this.state.num).attributes.name} </Text>
                <View style={styles.body}>
                    <View style={styles.boutonWrapper}>
                        <TouchableOpacity style={styles.button} onPress={() => this.scenNumberPrev()}>
                            <Text style={styles.buttonText}> Previous </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button} onPress={() => this.scenNumberNext()}>
                            <Text style={styles.buttonText}> Next </Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={() => this.goToHomePage()}>
                        <Text style={styles.buttonText}> Return </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
export default Scenario;
