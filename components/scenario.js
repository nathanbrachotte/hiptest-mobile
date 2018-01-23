//React and all his friends
import React, {Component} from 'react';
import {Alert, Button, Text, TouchableOpacity, View, ActivityIndicator, ListView, FlatList } from 'react-native';
import {Actions} from 'react-native-router-flux';
import ApiResponse from './apiResponse';
//Styles
import styles from '../Style'
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

class Scenario extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            ScenarioChosen: 0,
            resultatLoad: "unknown",
            myText: 'I\'m ready to get swiped!',
            gestureName: 'none',
        };
    }

    componentDidMount() {

        this.test()
    };

    goToHomePage()
    {
        Actions.HomePage();
    };
    onSwipeLeft(gestureState) {
        this.setState({myText: 'You swiped left!'});
        this.scenNumberPrev();
    }

    onSwipeRight(gestureState) {
        this.setState({myText: 'You swiped right!'});
       this.scenNumberNext();
    }
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



test() {
    var api = new ApiResponse();
    var testSnapshotsPromise = api.getTestSnapshot();

    testSnapshotsPromise.then((testSnapshots) => {
        console.log(testSnapshots);
        let ds1 = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
            listScenario: ds1.cloneWithRows(testSnapshots.data),
            nbElement: (testSnapshots.data.length - 1),
        }, function () {
            let te = this.state.listScenario.getRowData(0, this.state.ScenarioChosen)['attributes']['definition-json']['steps'];
            let idSnapShot = this.state.listScenario.getRowData(0, this.state.ScenarioChosen)['id'];
            this.stepsResult(te, idSnapShot);
            this.scenarioDescription(idSnapShot);
        });
    })
}


    scenarioDescription(idSnapShot){
        var api = new ApiResponse();
        var scenarioDescriptionPromise = api.getScenarioDescription(idSnapShot);
        scenarioDescriptionPromise.then((scenarioDescription) => {
                let ds1 = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                descRes = ds1.cloneWithRows(scenarioDescription.included).getRowData(0,0)['attributes']['description'];
                this.setState({
                    descScenario: descRes,
                    isLoading: false,
                })
            })
            .catch((error) => {
                console.error(error);
            });
    }

    stepsResult(steps,idSnapShot){
        var api = new ApiResponse();
        var stepsResultPromise = api.getStepsResult(idSnapShot);

        stepsResultPromise.then((stepsResult) => {

               let ds1 = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
               stepsRes = ds1.cloneWithRows(stepsResult.included).getRowData(0,0)['attributes']['step-statuses'];
               resScen = ds1.cloneWithRows(stepsResult.included).getRowData(0,0)['attributes']['status'];
                var stepsArray = [];
                var stepsCount = stepsRes.length;
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
        const config = {
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80
        };

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return (
            <View style={styles.container}>

                <View style={styles.body}>
                    {/* <View style={styles.boutonWrapper}>
                        <TouchableOpacity style={styles.button} onPress={() => this.scenNumberPrev()}>
                            <Text style={styles.buttonText}> Previous </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button} onPress={() => this.scenNumberNext()}>
                            <Text style={styles.buttonText}> Next </Text>
                        </TouchableOpacity>
                    </View>*/}
                    <GestureRecognizer
                        onSwipeLeft={(state) => this.onSwipeLeft(state)}
                        onSwipeRight={(state) => this.onSwipeRight(state)}
                        config={config}
                        style={{

                            backgroundColor: this.state.backgroundColor
                        }}
                        >
                        <Text style={styles.title}> {this.state.listScenario.getRowData(0, this.state.ScenarioChosen)['attributes']['name']}-{"\n"}{this.state.scenRes}</Text>
                        <Text style={styles.body}>{this.state.descScenario}</Text>
                        <FlatList
                            data={this.state.steps}
                            renderItem={({item}) => this.renderSteps(item)}
                        />
                        <TouchableOpacity style={styles.button} onPress={() => this.goToHomePage()}>
                            <Text style={styles.buttonText}> Return </Text>
                        </TouchableOpacity>
                    </GestureRecognizer>




                </View>
            </View>

        );
    }
}
export default Scenario;
