import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  PixelRatio
} from 'react-native';
var {height, width} = Dimensions.get('window');
import Info from '../Components/Info.js'
import Casts from '../Components/Casts.js'
import Trailer from '../Components/Trailer.js'
var ScrollableTabView = require('react-native-scrollable-tab-view');

if (PixelRatio.get() === 2){
  size = 15;
  sizeName = 18;
  sizeCategory = 12;
  hsizeViewDetail = 20;
  size23 = 23;
}else if (PixelRatio.get() === 3){
  size = 18;
  sizeName = 21;
  sizeCategory = 15;
  hsizeViewDetail = 25;
  size23 = 30;
}else if (PixelRatio.get() === 3.5){
  size = 24;
  sizeName = 27;
  sizeCategory = 21;
  hsizeViewDetail = 30;
  size23 = 35;
}

if (width >= 768){
  size = 24;
  sizeName = 27;
  sizeCategory = 21;
  hsizeViewDetail = 30;
  size23 = 35;
}

export default class Detail extends Component {
  constructor(props){
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.imgBg}
        source={{uri: this.props.data.Image}}>
          <TouchableOpacity onPress={this.props.pop}>
            <Image
              style={styles.imgBack}
              source={require('../Public/Images/back.png')}
            />
          </TouchableOpacity>
        </Image>
        <Image style={styles.imgThumb}
          source={{uri: this.props.data.ImageThumb}}
        />

        <View style={styles.info}>
          <Text style={[styles.text]}>
            {this.props.data.Name}
          </Text>
          <Text style={styles.textDetail}>
            {this.props.data.DetailShort.substr(0, 90) + '...'}
          </Text>
          <Text style={styles.textDetail}>
            {this.props.data.Category}
          </Text>
          <Image style={styles.imgStar}
            source={require('../Public/Images/star.png')}
          />
          <Text style={styles.textRank}>
            {this.props.data.Rank}
          </Text>
        </View>

        <View style={styles.tab}>
          <ScrollableTabView
            tabBarBackgroundColor={'black'}
            tabBarActiveTextColor={'white'}
            tabBarInactiveTextColor={'white'}
            tabBarUnderlineStyle={{backgroundColor:'white'}}
          >
            <Info tabLabel="NỘI DUNG" info={this.props.data.Detail}/>
            <Casts tabLabel="DIỄN VIÊN" />
            <Trailer tabLabel="TRAILER" link={this.props.data.Trailer}/>
          </ScrollableTabView>
        </View>
      </View>
    );
  }

}

var styles = StyleSheet.create({
  container: {
    backgroundColor:'black',
    flex:1
  },

  imgBg:{
    width:width,
    height:height/3
  },

  imgBack:{
    width:size23,
    height:size23,
    marginTop:size23,
    marginLeft:10
  },

  imgThumb:{
    width:width/3,
    height:height/3,
    marginTop:-50,
    marginLeft:20,
    zIndex:1
  },

  info:{
    width:width/2,
    height:height /4 ,
    marginTop:-(height/4),
    marginLeft:width/3 + 50,
    backgroundColor:'transparent',
    zIndex:2
  },

  textDetail:{
    fontSize:sizeCategory,
    color:'white',
    fontWeight:'bold',
    marginTop:8
  },

  tab:{
    backgroundColor:'black',
    flex:1/3,
    paddingTop:20
  },

  text:{
    fontSize:sizeName,
    color:'white',
    fontWeight:'bold',
    paddingTop:20
  },

  imgStar:{
    width:height/20,
    height:height/20
  },

  textRank:{
    marginLeft:height/18,
    marginTop:-(height/38),
    fontSize:sizeCategory,
    color:'white',
    fontWeight:'bold',
  },
});
