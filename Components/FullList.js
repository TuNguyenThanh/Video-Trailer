import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ListView,
  Dimensions,
  Alert,
  PixelRatio
} from 'react-native';
var {height, width} = Dimensions.get('window');
if (PixelRatio.get() === 2){
  size15 = 15;
  size18 = 18;
  size12 = 12;
  size23 = 23;
}else if (PixelRatio.get() === 3){
  size15 = 18;
  size18 = 21;
  size12 = 15;
  size23 = 30;
}else if (PixelRatio.get() === 3.5){
  size = 24;
  sizeName = 27;
  sizeCategory = 21;
  hsizeViewDetail = 30;
  size23 = 35;
}

if (width >= 768){
  size15 = 24;
  size18 = 27;
  size12 = 21;
  size23 = 35;
}


export default class List extends Component {
  constructor(props){
    super(props);
    this.state = {
      page:1,
      dataSource: new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!=r2})
    };
  }

  createRow(item){
    return(
      <TouchableOpacity style={styles.bgItem}
      onPress={this.props.viewDetail.bind(this, item)} >
        <Image style={styles.img}
          source={{uri: item.ImageThumb}}
        />
        <View style={styles.detail}>
          <Text style={styles.text}>{item.Name}</Text>
          <Text style={styles.textYear}>{item.Date}</Text>
          <Image style={styles.imgStar}
            source={require('../Public/Images/star.png')}
          >
          </Image>
          <Text style={styles.textRank}>{item.Rank}</Text>
          <Text style={styles.textInfo}>{item.Detail.substr(0, 150) + '...'}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  _onEndReached(){
    fetch("http://pttkht.esy.es/getLimit.php?page="+ (this.state.page + 1))
    .then((response)=> response.json())
    .then((responseJson) => {
      if (responseJson.length != 0){
        mang = mang.concat(responseJson);
        console.log({mang});
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(mang),
          page: this.state.page + 1
        });
      }
    })
    .catch((error)=> {
      console.error(error);
    });
  }

  render() {
    return (
      <View style={styles.bg} >
        <View style={styles.nav}>
          <TouchableOpacity onPress={this.props.pop1}>
            <Image style={styles.imgBack}
              source={require('../Public/Images/back.png')}
            />
          </TouchableOpacity>
          <View >
            <Text style={styles.title}>PHIM ĐỀ CỬ</Text>
          </View>
        </View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.createRow.bind(this)}
          onEndReached={this._onEndReached.bind(this)}
          onEndReachedThreshold ={10}
        />
      </View>
    );
  }

  componentDidMount(){
    fetch("http://pttkht.esy.es/getLimit.php?page="+this.state.page)
    .then((response)=> response.json())
    .then((responseJson) => {
      mang = responseJson
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(mang)
      });
    })
    .catch((error)=> {
      console.error(error);
    });
  };

}

var styles = StyleSheet.create({
  bg:{
    flex:1,
    backgroundColor:'black'
  },

  nav:{
    width:width,
    height:64,
    backgroundColor:'black',
    flexDirection:'row'
  },

  imgBack:{
    width:size23,
    height:size23,
    marginTop:size23,
    marginLeft:10
  },

  bgItem: {
    backgroundColor:'black',
    borderWidth: 1,
    flexDirection:'row',
    height:height / 3,
    width:width,
    marginTop:8
  },

  detail:{
    height:height / 3,
    width: (width * 2) / 3,
    backgroundColor:'white',
  },

  text:{
    marginLeft:8,
    marginTop:20,
    fontSize:size15,
    color:'black',
    fontWeight:'bold',
  },

  textYear:{
    marginLeft:8,
    fontSize:size12,
    color:'gray',
    fontWeight:'bold',
  },

  img:{
    height:height /3 ,
    width:width / 3,
  },

  imgStar:{
    width:height/20,
    height:height/20,
    marginLeft:4,
  },

  textRank:{
    marginLeft: height/18,
    marginTop:-(height/25),
    fontSize:size12,
    color:'gray',
    fontWeight:'bold',
  },

  textInfo:{
    marginLeft:8,
    marginTop:8,
    fontSize:size12,
    color:'gray',
    fontWeight:'bold',
    width: ((width * 2) / 3 ) - 16,
    height: (height / 6) ,
    textAlign:'justify',
  },

  title:{
    marginLeft:20,
    marginTop:25,
    fontSize:size18,
    color:'white',
    fontWeight:'bold',
  },
});
