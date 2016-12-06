/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Navigator,
} from 'react-native';
const window = Dimensions.get('window');
import Main     from './Components/Main.js'
import Detail   from './Components/Detail.js'
import FullList from './Components/FullList.js'

export default class Demo05 extends Component {
  renderScene(route, navigator){
    switch (route.name) {
      case "main":return (
        <Main
        viewDetail={(data)=>{navigator.push({name:"detail", passProps:{
          data: data
        }})}}
        clickItem ={()=>{navigator.push({name:"list"})}} />
      );
      case "detail":return (
        <Detail
          pop={()=>{navigator.pop();}}
          data={route.passProps.data}
        />
      );

      case "list":return (
        <FullList
          pop1={()=>{navigator.pop();}}
          viewDetail={(data)=>{navigator.push({name:"detail", passProps:{
            data: data
          }})}}
        />
      );

      default:
    }
  }

  render() {
    return (
      <Navigator
        initialRoute={{name:"main"}}
        renderScene={(this.renderScene)}
      />
    );
  }

}

AppRegistry.registerComponent('Demo05', () => Demo05);
