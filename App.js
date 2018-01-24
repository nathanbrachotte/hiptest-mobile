//React and all his friends
import React from 'react';
import {View, StatusBar } from 'react-native';

//Styles
import Connection from './components/connection'


export default class App extends React.Component {

  render() {
      console.disableYellowBox = true;
    return (
        <View style={{flex:1}}>
            <StatusBar hidden = {true}/>
            <Connection/>
        </View>
    );
    }
}
