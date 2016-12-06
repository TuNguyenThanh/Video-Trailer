import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  TouchableOpacity,
  Dimensions,
  Alert
} from 'react-native';
var {height, width} = Dimensions.get('window');
import Info from '../Components/Info.js'
var ScrollableTabView = require('react-native-scrollable-tab-view');

export default class DanhSach extends Component {
  constructor(props){
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!=r2})
    };
  }

  _onEndReached(){
    console.log('\n\n onEndReached \n\n');
    t = ["A","B","C","D"];
    mang = mang.concat(t);
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(mang)
    });
  }

  _pressRow(){
    Alert.alert(
      'Ban da chon',
      'click',
      [
        {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]
    )
  }

  createRow(property){
    return(
      <TouchableOpacity style={styles.bgItem}
      onPress={()=>{this._pressRow()}}
      >
        <Image style={styles.img}
          source={require('../Public/Images/trailer.jpg')}
        />

        <View style={styles.detail}>
          <Text style={styles.text}>BIỆT ĐỘI CẢM TỬ</Text>
          <Text style={styles.textYear}>2016</Text>
          <Image
            style={{width:20, height:20, marginLeft:4}}
            source={require('../Public/Images/star.png')}
          >
          </Image>
          <Text style={styles.textRank}>8.9</Text>
          <Text style={styles.textInfo}>
            Suicide Squad xoay quanh nhóm ác nhân mang tên Biệt đội Cảm tử. Đây là tổ chức đánh thuê gồm toàn những kẻ thù của Batman, được chính phủ tập hợp lại để chuyên thực hiện các nhiệm vụ tối mật...
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.createRow.bind(this)}
        onEndReached={this._onEndReached.bind(this)}
        onEndReachedThreshold ={10}
      />
    );
  }

  componentDidMount(){
    mang = ["A","B","C","D"]
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(mang)
    });
  };

}

var styles = StyleSheet.create({
  bgItem: {
    backgroundColor:'black',
    borderWidth: 1,
    flexDirection:'row',
    height:height / 3,
    width:width,
    marginTop:8
  },

  img:{
    height:height /3 ,
    width:width / 3,
  },

  detail:{
    height:height / 3,
    backgroundColor:'white',
  },

  text:{
    marginLeft:8,
    marginTop:20,
    fontSize:15,
    color:'black',
    fontWeight:'bold',
  },

  textYear:{
    marginLeft:8,
    fontSize:12,
    color:'gray',
    fontWeight:'bold',
  },

  textRank:{
    marginLeft:25,
    marginTop:-16,
    fontSize:12,
    color:'gray',
    fontWeight:'bold',
  },

  textInfo:{
    marginLeft:8,
    marginTop:10,
    fontSize:12,
    color:'gray',
    fontWeight:'bold',
  },

  title:{
    marginLeft:20,
    marginTop:25,
    fontSize:23,
    color:'white',
    fontWeight:'bold',
  },
});
