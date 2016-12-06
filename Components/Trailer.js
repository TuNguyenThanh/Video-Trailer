import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  WebView,
  Dimensions
} from 'react-native';
var {height, width} = Dimensions.get('window');

export default class Trailer extends Component {
  render() {
    return (
      <WebView style={styles.bg}
        automaticallyAdjustContentInsets={false}
        source={{html:"<body style='background-color:black;'><iframe width="+ (width-20) +" height="+ ((height/3)-40) +" src='"+this.props.link+"?rel=0&amp;controls=0&amp;showinfo=0' allowfullscreen></iframe></body>"}}

        ref="webViewAndroidSample"
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowsInlineMediaPlayback={true}
      />
    );
  }
}

const styles = StyleSheet.create({
  bg:{
    backgroundColor:'black'
  }
});
