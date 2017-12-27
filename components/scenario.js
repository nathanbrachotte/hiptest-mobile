//React and all his friends
import React, {Component} from 'react';
import {Alert, Button, Text, TouchableOpacity, View, AsyncStorage, ActivityIndicator, ListView, FlatList } from 'react-native';
import {Actions} from 'react-native-router-flux';
import InvertibleScrollView from 'react-native-invertible-scroll-view';
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


        this.test()
    };

    goToHomePage()
    {
        Actions.HomePage();

    };

    scenNumberNext(){
        if(this.state.ScenarioChosen === 0){
            this.setState({isLoading: false,ScenarioChosen: this.state.nbElement});
           this.test()

        }else{
            this.setState({isLoading: false,ScenarioChosen: this.state.ScenarioChosen-1});
            this.test()
        }
    };
    scenNumberPrev(){
        if(this.state.ScenarioChosen === this.state.nbElement){
            this.setState({isLoading: false,ScenarioChosen: 0});
            this.test()
        }else{
            this.setState({isLoading: false,ScenarioChosen: this.state.ScenarioChosen+1});
            this.test()
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
                //console.log(responseJson.data);
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
                nbElement:  (responseJson.data.length - 1),
                //steps: ds1.cloneWithRows(responseJson.data).getRowData(0,this.state.ScenarioChosen)['attributes']['definition-json']['steps'],
            }, function() {
                //console.log(this.state.listScenario.getRowData(0,this.state.ScenarioChosen)['attributes']['definition-json']['scenario_name']);
             //   console.log("step : " + this.state.steps);
                console.log(this.state.listScenario)
                //GET SCENARIO NAME
                //console.log(this.state.listScenario.getRowData(0,0)['attributes']['definition-json']['scenario_name']);
                //GET FIRST STEP OF THE FIRST SCENARIO
                let te = this.state.listScenario.getRowData(0,this.state.ScenarioChosen)['attributes']['definition-json']['steps'];
                let idSnapShot = this.state.listScenario.getRowData(0,this.state.ScenarioChosen)['id'];
                this.stepsResult(te,idSnapShot);
                this.scenarioDescription(idSnapShot);
            });
        })
        .catch((error) => {
            console.error(error);
        });
}

    scenarioDescription(idSnapShot){
        fetch('https://hiptest.net/api/projects/31812/test_runs/44718/test_snapshots/'+idSnapShot+'?include=scenario', {
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
                // console.log(responseJson);
                let ds1 = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                descRes = ds1.cloneWithRows(responseJson.included).getRowData(0,0)['attributes']['description'];
              //  console.log(responseJson.data)
                this.setState({
                    descScenario: descRes,
                    isLoading: false,
                })
                 console.log(this.state.descScenario);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    stepsResult(steps,idSnapShot){
        fetch('https://hiptest.net/api/projects/31812/test_runs/44718/test_snapshots/'+idSnapShot+'?include=last-result', {
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
                console.log(responseJson);

               let ds1 = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
               stepsRes = ds1.cloneWithRows(responseJson.included).getRowData(0,0)['attributes']['step-statuses'];
               resScen = ds1.cloneWithRows(responseJson.included).getRowData(0,0)['attributes']['status'];
              // console.log(stepsRes);
                var stepsArray = [];
                var stepsCount = stepsRes.length;
               // console.log("nbSteps : " + stepsCount);
                steps.forEach((step, index) => {
                    if (step['action']) {
                        console.log('do something with this action named: ', step['action']);
                        if(index >= stepsCount){
                            stepsArray.push({action : step['action'],status : "undefined"});
                        }
                        else
                        {
                            stepsArray.push({result : step['action'],status : stepsRes[index]});
                        }

                    } else {
                        console.log('do something with this result named: ', step['result']);
                        if(index >= stepsCount){
                            stepsArray.push({action : step['result'],status : "undefined"});
                        }
                        else
                        {
                            stepsArray.push({result : step['result'],status : stepsRes[index]});
                        }
                    }

                });
                console.log(stepsArray);
                this.setState({
                    steps : stepsArray,
                    scenRes: resScen,
                })

            })
            .catch((error) => {
                console.error(error);
            });
    }

    renderSteps(item) {
           if(item.action){
               switch (item.status){
                   case "undefined" :
                       return <View><Text>{item.action}</Text><Text style={styles.statusUndefined}>{item.status}</Text>
                       </View>
                   break;

                   case "passed":
                       return <View><Text>{item.action}</Text><Text style={styles.statusPassed}>{item.status}</Text>
                       </View>
                   break;

                   case "failed":
                       return <View><Text>{item.action}</Text><Text style={styles.statusFailed}>{item.status}</Text>
                       </View>
                   break;
               }

           }
           else
           {
               switch (item.status){
                   case "undefined" :
                       return <View><Text>{item.result}</Text><Text style={styles.statusUndefined}>{item.status}</Text>
                       </View>
                       break;

                   case "passed":
                       return <View><Text>{item.result}</Text><Text style={styles.statusPassed}>{item.status}</Text>
                       </View>
                       break;

                   case "failed":
                       return <View><Text>{item.result}</Text><Text style={styles.statusFailed}>{item.status}</Text>
                       </View>
                       break;
               }
           }

    }

    /*renderRes(res) {
            console.log(res);
            switch (res){
                case "undefined" :
                    return <View><Text style={styles.statusUndefined}>{res}</Text>
                    </View>
                    break;

                case "passed":
                    return <View><Text style={styles.statusPassed}>{res}</Text>
                    </View>
                    break;

                case "failed":
                    return <View><Text style={styles.statusFailed}>{res}</Text>
                    </View>
                    break;
            }

        }*/
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
                <Text style={styles.title}> {this.state.listScenario.getRowData(0, this.state.ScenarioChosen)['attributes']['name']}-{"\n"}{this.state.scenRes}</Text>
                <Text style={styles.body}>{this.state.descScenario}</Text>
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
//    <Text style={styles.body}>{this.state.descScenario.getRowData(0, this.state.ScenarioChosen).attributes.definition}</Text>