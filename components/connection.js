/**
 * Created by nathanbrachotte on 15/11/17.
 */
//React and all his friends
import React from 'react';
import {AsyncStorage, View, Button, ActivityIndicator } from 'react-native';
import {Router, Scene} from 'react-native-router-flux';
//Styles
//Other components
import Authentication from './authentication';
import HomePage from './homepage';
import Scenario from './scenario';


export default class Connection extends React.Component {
    constructor(props) {
        super(props);
        this.state = { text: 'Connexion' };
    }

    static navigationOptions = {
        title: 'Connection',
    };

    /*search() {
        this.props.navigation.navigate('HomePage');
    };*/

    componentWillMount() {
        AsyncStorage.getItem('id_token').then((token) => {
            this.setState({ hasToken: token !== null })
        })
    }
    componentDidMount() {
        AsyncStorage.getItem('id_token').then((token) => {
            this.setState({ hasToken: token !== null, isLoaded: true })
        });
    }
    render() {
        if (!this.state.isLoaded) {
            return (
                <ActivityIndicator />
            )
        } else {
            return (
                <Router>
                <Scene key='root'>
                    <Scene
                        component={Authentication}
                        hideNavBar={true}
                        initial={true}
                        key='Authentication'
                        title='Authentication'
                    />
                    <Scene
                        component={HomePage}
                        hideNavBar={true}
                        key='HomePage'
                        title='Home Page'
                    />
                    <Scene
                        component={Scenario}
                        hideNavBar={true}
                        key='Scenario'
                        title='Scenario'
                    />
                </Scene>
            </Router>
        );}
    }
}
