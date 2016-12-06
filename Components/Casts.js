import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  WebView
} from 'react-native';

export default class Casts extends Component {
  render() {
    return (
      <View styte={styles.bg}>
        <Text style={styles.text}>Đang cập nhật...</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bg:{
    backgroundColor:'black'
  },

  text:{
    paddingLeft:8,
    fontSize:12,
    color:'white',
    fontWeight:'bold',
    paddingTop:20
  }
});
