import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  PixelRatio,
  Dimensions
} from 'react-native';
var {height, width} = Dimensions.get('window');
if (PixelRatio.get() === 2){
  sizeName = 18;
  sizeCategory = 12;
}else if (PixelRatio.get() === 3){
  sizeName = 21;
  sizeCategory = 15;
}

if (width >= 768){
  sizeName = 27;
  sizeCategory = 21;
}

export default class Info extends Component {
  render() {
    return (
      <ScrollView >
        <View>
          <Text style={styles.h1}>
            Nội dung phim :
          </Text>
          <Text style={styles.text}>
            {this.props.info}
          </Text>
        </View>
      </ScrollView>

    );
  }
}

const styles = StyleSheet.create({
  text:{
    paddingLeft:8,
    fontSize:sizeCategory,
    color:'white',
    fontWeight:'bold',
    paddingTop:20
  },

  h1:{
    paddingLeft:8,
    fontSize:sizeName,
    color:'white',
    fontWeight:'bold',
    paddingTop:20
  },
});
