//React and all his friends
import React, {Component} from 'react';
import {Alert, Button, Text, TouchableOpacity, View, AsyncStorage, ActivityIndicator, ListView } from 'react-native';
//Styles
import styles from '../Style'

class Scenario extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        };
    }

    static navigationOptions = {
        title: 'Scenario',
    };

    /*componentDidMount() {
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
                    let ds = new ListView.DataSource({rowHasChanged: (r1, r2)})
                )
                .done();
        })
    }*/
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
                nbElement:  responseJson.data.length,
            }, function() {
                // do something with new state
            });
            console.log(this.state.dataSource.getRowData(0, 0))
        })
        .catch((error) => {
            console.error(error);
        });
}

render() {
    if (this.state.isLoading) {
        return (
            <View style={{flex: 1, paddingTop: 20}}>
                <ActivityIndicator />
            </View>
        );
    }

    return (
        <View style={{flex: 1, paddingTop: 20}}>
            <ListView
                dataSource={this.state.dataSource}
                renderRow={(rowData) => <Text>{rowData.attributes.name}</Text>}
            />
        </View>
    );
}
}
export default Scenario;
