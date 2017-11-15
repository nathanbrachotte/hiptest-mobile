/**
 * Created by nathanbrachotte on 15/11/17.
 */
import React from 'react';
import {Text, View, Button, ActivityIndicator, ListView } from 'react-native';
import styles from '../Style'

export default class TestList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }


    }
    test() {
        /*myRequest = new Request('https://hiptest.net/api/projects/63071/scenarios');
        fetch(myRequest)
            .then((response) => response.json())
            .then((responseJson) => {
                console.debug(responseJson);
            });
*/
        fetch('https://hiptest.net/api/projects/63071/scenarios')
                .then((response) => response.text())
                .then((responseJson) => {
                    return responseJson.data;
                })
                .catch((error) => {
                    console.error(error);
                });
    }

    render(){
        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, paddingTop: 20}}>
                    <ActivityIndicator />
                    <Button onPress={()=> this.test()} style={styles.button} title={"IBRAHIM"}/>

                </View>
            );
        }

        return (
            <View style={{flex: 1, paddingTop: 20}}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => <Text>{rowData.title}, {rowData.releaseYear}</Text>}
                />
            </View>
        );
    }
}