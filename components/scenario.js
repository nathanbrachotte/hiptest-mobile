//React and all his friends
import React, {Component} from 'react';
import {Alert, Button, Text, TouchableOpacity, View, AsyncStorage, ActivityIndicator, ListView, FlatList } from 'react-native';
import {Actions} from 'react-native-router-flux';
import _ from 'lodash';
//Styles
import styles from '../Style'

class Scenario extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            ScenarioChosen: 0,
            resultatLoad: "unknown"
        };
    }

    static navigationOptions = {
        title: 'Scenario',
    };

    componentDidMount() {
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
            .then((responseJson) => {
                let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                this.setState({
                    isLoading: false,
                    dataSource: ds.cloneWithRows(responseJson.data),
                    nbElement:  (responseJson.data.length - 1),
                }, function() {
                    //console.log(this.state.dataSource.getRowData(0, 0));
                    // do something with new state
                });
            })
            .catch((error) => {
                console.error(error);
            });

        this.test()
    };

    goToHomePage()
    {
        Actions.HomePage();

    };

    scenNumberNext(){
        if(this.state.ScenarioChosen === 0){
            this.setState({isLoading: false,ScenarioChosen: this.state.nbElement});
            //this.state.steps = this.state.listScenario.getRowData(0,this.state.ScenarioChosen)['attributes']['definition-json']['steps'];

        }else{
            this.setState({isLoading: false,ScenarioChosen: this.state.ScenarioChosen-1});
        }
    };
    scenNumberPrev(){
        if(this.state.ScenarioChosen === this.state.nbElement){
            this.setState({isLoading: false,ScenarioChosen: 0});
        }else{
            this.setState({isLoading: false,ScenarioChosen: this.state.ScenarioChosen+1});
        }
    };

    getTestsRun(){
        fetch('https://hiptest.net/api/projects/31812/test_runs', {
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
                console.log(responseJson.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    getTestOfTestsRun(){
            fetch('https://hiptest.net/api/projects/31812/test_runs/44718/test_snapshots', {
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
                let ds2 = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                this.setState({
                   result: ds2.cloneWithRows(responseJson.data),
                })
                console.log(responseJson.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

test(){
    fetch('https://hiptest.net/api/projects/31812/test_runs/44718/test_snapshots', {
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
            //console.log(responseJson.data);

            let ds1 = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            this.setState({
                listScenario: ds1.cloneWithRows(responseJson.data),
                steps: ds1.cloneWithRows(responseJson.data).getRowData(0,this.state.ScenarioChosen)['attributes']['definition-json']['steps'],
            }, function() {
                //console.log(this.state.listScenario.getRowData(0,this.state.ScenarioChosen)['attributes']['definition-json']['scenario_name']);
                console.log("step : " + this.state.steps);

                //GET SCENARIO NAME
                //console.log(this.state.listScenario.getRowData(0,0)['attributes']['definition-json']['scenario_name']);
                //GET FIRST STEP OF THE FIRST SCENARIO
                let te = this.state.listScenario.getRowData(0,this.state.ScenarioChosen)['attributes']['definition-json']['steps'];
                var steps = [];
                te.forEach((step, index) => {
                    if (step['action']) {
                        console.log('do something with this action named: ', step['action']);
                        steps.push({action : step['action']});
                    } else {
                        console.log('do something with this result named: ', step['result']);
                        steps.push({result : step['result']});
                    }

                });
                console.log(steps);
            });
        })
        .catch((error) => {
            console.error(error);
        });
}

    renderSteps(item) {
           if(item.action){
             return <Text>{item.action}</Text>
           }
           else
           {
           return <Text>{item.result}</Text>
           }

    }
    renderResult(){
        this.getTestOfTestsRun();
        console.log(this.state.result.getRowData(0,0).attributes.status);
        this.setState({
            resultatLoad: this.state.result.getRowData(0, 0).attributes.status,
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
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return (
            <View style={styles.container}>
                <Text style={styles.title}> {this.state.dataSource.getRowData(0, this.state.ScenarioChosen).attributes.name}</Text>
                <Text>{this.state.resultatLoad}</Text>
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
                    <TouchableOpacity style={styles.button} onPress={() => this.getTestsRun()}>
                        <Text style={styles.buttonText}> GetTestRuns </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => this.getTestOfTestsRun()}>
                        <Text style={styles.buttonText}> Get Tests in TestRun </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => this.renderResult()}>
                        <Text style={styles.buttonText}> Get result of test run </Text>
                    </TouchableOpacity>
                    <FlatList
                        data={this.state.steps}
                        renderItem={({item}) => this.renderSteps(item)}
                    />

                </View>


            </View>
        );
    }
}
export default Scenario;

/*
<Text style={styles.title}> {this.state.listScenario.getRowData(0,this.state.ScenarioChosen)['attributes']['definition-json']['scenario_name']} </Text>

 */