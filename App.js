//React and all his friends
import React from 'react';
import {View, StatusBar } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation'

//Styles
import Connection from './components/connection'
import Authentication from "./components/authentication";
import HomePage from "./components/homepage";
/*
const Tabs = TabNavigator({
    Connection: { screen: Connection },
    HomePage: { screen: HomePage },
    },
    {
        //tabBarPosition: 'bottom',
        tabBarOptions: {
            showIcon : true,
            showLabel: true,
            pressColor:"#FF0000",
            style: {
                backgroundColor:"#000000",
                borderTopWidth:1,
                borderColor:"#99ff15"
            }
        },
    },
    {
        header: null
    });
*/

export default class App extends React.Component {
  render() {
    return (
        <View style={{flex:1}}>
            <StatusBar hidden = {true}/>
            <Connection/>
        </View>
    );
    }
}
