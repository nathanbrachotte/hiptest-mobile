//React and all his friends
import React, {Component} from 'react';
import {Image, Text, TouchableOpacity, View, ActivityIndicator, ListView, FlatList } from 'react-native';
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
        this.scenNumberPrev();
    }

    onSwipeRight(gestureState) {
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
                var indice = 1;
                steps.forEach((step, index) => {
                    if (step['action']) {
                        if(index >= stepsCount){
                            stepsArray.push({action : step['action'],status : "undefined",indice: indice});
                            indice++;
                        }
                        else
                        {
                            stepsArray.push({action : step['action'],status : stepsRes[index],indice: indice});
                            indice++;
                        }

                    } else {

                        if(index >= stepsCount){
                            stepsArray.push({result : step['result'],status : "undefined",indice: indice});
                            indice++;
                        }
                        else
                        {
                            stepsArray.push({result : step['result'],status : stepsRes[index],indice: indice});
                            indice++;
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
                       return <View style={{flex:1,flexDirection:"row"}}>
                           <View style={styles.indiceSteps}>
                               <Text>{item.indice}</Text>
                           </View>
                           <View style={styles.nomSteps}>
                               <Image style={{width:20,height:20}} source={require('../icone/icons8-support-50.png')}/>
                               <Text style={{flex:1}}>{item.action}</Text>
                           </View>
                           <View style={styles.resultSteps}>
                           <Image style={{width:30,height:30}} source={require('../icone/icons8-aide-50.png')}/>
                           </View>
                       </View>
                   break;

                   case "passed":
                       return <View style={{flex:1,flexDirection:"row"}}>
                           <View style={styles.indiceSteps}>
                               <Text>{item.indice}</Text>
                           </View>
                           <View style={styles.nomSteps}>
                               <Image style={{width:20,height:20}} source={require('../icone/icons8-support-50.png')}/>
                               <Text style={{flex:1}}>{item.action}</Text>
                           </View>
                           <View style={styles.resultSteps}>
                               <Image style={{width:30,height:30}} source={require('../icone/icons8-ok-50.png')}/>
                           </View>
                       </View>
                   break;

                   case "failed":
                       return <View style={{flex:1,flexDirection:"row"}}>
                           <View style={styles.indiceSteps}>
                               <Text>{item.indice}</Text>
                           </View>
                           <View style={styles.nomSteps}>
                               <Image style={{width:20,height:20}} source={require('../icone/icons8-support-50.png')}/>
                               <Text style={{flex:1}}>{item.action}</Text>
                           </View>
                           <View style={styles.resultSteps}>
                               <Image style={{width:30,height:30}} source={require('../icone/icons8-annuler-50.png')}/>
                           </View>
                       </View>
                   break;
               }

           }
           else
           {
               switch (item.status){
                   case "undefined" :
                       return <View style={{flex:1,flexDirection:"row"}}>
                           <View style={styles.indiceSteps}>
                               <Text>{item.indice}</Text>
                           </View>
                           <View style={styles.nomSteps}>
                               <Image style={{width:20,height:20}} source={require('../icone/icons8-eye-50.png')}/>
                               <Text style={{flex:1, marginLeft:25}}>{item.result}</Text>
                           </View>
                           <View style={styles.resultSteps}>
                               <Image style={{width:30,height:30}} source={require('../icone/icons8-aide-50.png')}/>
                           </View>
                       </View>
                       break;

                   case "passed":
                       return <View style={{flex:1,flexDirection:"row"}}>
                           <View style={styles.indiceSteps}>
                               <Text>{item.indice}</Text>
                           </View>
                           <View style={styles.nomSteps}>
                               <Image style={{width:20,height:20}} source={require('../icone/icons8-eye-50.png')}/>
                               <Text style={{flex:1, marginLeft:25}}>{item.result}</Text>
                           </View>
                           <View style={styles.resultSteps}>
                               <Image style={{width:30,height:30}} source={require('../icone/icons8-ok-50.png')}/>
                           </View>
                       </View>
                       break;

                   case "failed":
                       return <View style={{flex:1,flexDirection:"row"}}>
                           <View style={styles.indiceSteps}>
                               <Text>{item.indice}</Text>
                           </View>
                           <View style={styles.nomSteps}>
                               <Image style={{width:20,height:20}} source={require('../icone/icons8-eye-50.png')}/>
                               <Text style={{flex:1, marginLeft:25}}>{item.result}</Text>
                           </View>
                           <View style={styles.resultSteps}>
                               <Image style={{width:30,height:30}} source={require('../icone/icons8-annuler-50.png')}/>
                           </View>
                       </View>
                       break;
               }
           }
    }

    renderRes(res) {

            switch (res){
                case "undefined" :
                    return <View><Image source={require('../icone/icons8-aide-50.png')}/></View>
                    break;

                case "passed":
                    return <View><Image source={require('../icone/icons8-ok-50.png')}/>
                    </View>
                    break;

                case "failed":
                    return <View><Image source={require('../icone/icons8-annuler-50.png')}/>
                    </View>
                    break;
            }

        }

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "86%",
                    backgroundColor: "#CED0CE",
                    marginLeft: "14%"
                }}
            />
        );
    };

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
            <View style={{flex : 1}}>
                    <GestureRecognizer
                        onSwipeLeft={(state) => this.onSwipeLeft(state)}
                        onSwipeRight={(state) => this.onSwipeRight(state)}
                        config={config}
                        style={{
                            flex:1,
                            flexDirection:"column",
                        }}
                        >
                        <View style={styles.headerScenario}>

                            <Text style={{fontSize:20}}> Test running : {"\n" + this.state.listScenario.getRowData(0, this.state.ScenarioChosen)['attributes']['name']}</Text>
                            {this.renderRes(this.state.scenRes)}
                        </View>
                        <View style={styles.bodyScenario}>
                        <FlatList
                            data={this.state.steps}
                            renderItem={({item}) => this.renderSteps(item)}
                            ItemSeparatorComponent = {this.renderSeparator}
                        />
                        </View>
                        <View style={styles.infoScenario}>
                            <View style={{flex:1,flexDirection:"column"}}>
                                <View style={styles.titreInfo}>
                                    <Text>Attach</Text>
                                </View>
                                <View style={styles.contenuInfo}>
                                    <Text>Attachment here</Text>
                                </View>
                            </View>
                            <View style={{flex:1,flexDirection:"column"}}>
                                <View style={styles.titreInfo}>
                                    <Text>Comment</Text>
                                </View>
                                <View style={styles.contenuInfo}>
                                    <Text>{this.state.descScenario}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.footerScenario}>

                        <TouchableOpacity style={styles.button} onPress={() => this.goToHomePage()}>
                            <View style={styles.buttonView}>
                            <Image style={{width:20,height:20}} source={require('../icone/icons8-pause-50.png')}/>
                            <Text style={styles.buttonText}> Pause execution </Text>
                            </View>
                        </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => this.goToHomePage()}>
                                <View style={styles.buttonView}>
                                    <Image style={{width:20,height:20}} source={require('../icone/icons8-fin-50.png')}/>
                                    <Text style={styles.buttonText}> Close execution </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </GestureRecognizer>
            </View>

        );
    }
}
export default Scenario;
