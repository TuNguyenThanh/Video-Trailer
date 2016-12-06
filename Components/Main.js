import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ListView,
  PixelRatio
} from 'react-native';
var {height, width} = Dimensions.get('window');

if (PixelRatio.get() === 2){
  size = 15;
  sizeName = 18;
  sizeCategory = 12;
  hsizeViewDetail = 20;
  size40 = 40;
  size23 = 23;
}else if (PixelRatio.get() === 3){
  size = 18;
  sizeName = 21;
  sizeCategory = 15;
  hsizeViewDetail = 25;
  size40 = 50;
  size23 = 30;
}else if (PixelRatio.get() === 3.5){
  size = 24;
  sizeName = 27;
  sizeCategory = 21;
  hsizeViewDetail = 30;
  size40 = 80;
  size23 = 35;
}

if (width >= 768){
  size = 24;
  sizeName = 27;
  sizeCategory = 21;
  hsizeViewDetail = 30;
  size40 = 80;
  size23 = 35;
}

export default class Main extends Component {
  constructor(props){
    super(props);
    this.state = {
      movieTop: new Object(),
      detailShort: '',
      dataSource: new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!=r2})
    };
  }

  createRow(item){
    return(
      <View style={styles.row}>
        <TouchableOpacity onPress={this.props.viewDetail.bind(this,item)}>
          <Image
            style={styles.rowImageThumb}
            source={{uri: item.ImageThumb}}
          />
          <View style={styles.rowTitle}>
            <Text style={styles.textMovie}>{item.Name.substr(0, 20)}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.bg}>
        <View style={styles.nav}>
          <TouchableOpacity>
            <Image
               style={styles.menu}
               source={require('../Public/Images/menu.png')}
            />
          </TouchableOpacity>
          <View >
            <Text style={styles.title}>Movie</Text>
          </View>
        </View>

        <View style={styles.header}>
          <Image
            style={styles.imgBg}
            source={{uri: this.state.movieTop.Image}}
          >
            <View style={styles.content}>
              <View style={styles.container}>
                <Image
                  style={styles.imgThumb}
                  source={{uri: this.state.movieTop.ImageThumb}}
                />
                <View style={styles.info}>
                  <Text style={styles.text}>
                    {this.state.movieTop.Name}
                  </Text>
                  <Text style={styles.textCategory}>
                    {this.state.movieTop.Category}
                  </Text>
                  <Image
                    style={styles.imgStar}
                    source={require('../Public/Images/star.png')}
                  >
                  </Image>
                  <Text style={styles.textRank}>
                    {this.state.movieTop.Rank}
                  </Text>
                  <Text style={styles.detailShort}>
                    {this.state.detailShort}
                  </Text>
                  <TouchableOpacity style={styles.btnView} onPress={this.props.viewDetail.bind(this, this.state.movieTop)}>
                    <Text style={styles.textDetail}>Chi tiết</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Image>
        </View>

        <View style={styles.popular}>
            <View style={styles.lst}>
              <Text style={styles.textQ}>Phim đề cử</Text>
              <TouchableOpacity onPress={this.props.clickItem}>
                <Text style={styles.textSee}>Xem tất cả</Text>
              </TouchableOpacity>
            </View>
            <ListView
              dataSource={this.state.dataSource}
              horizontal={true}
              renderRow={this.createRow.bind(this)}
            />
        </View>
      </View>
    );
  }

  componentDidMount(){
    fetch("http://pttkht.esy.es/getMovieTop.php")
    .then((response)=> response.json())
    .then((responseJson) => {
      var movieTop2 = new Object();
      movieTop2.Id = responseJson[0].Id;
      movieTop2.Name = responseJson[0].Name;
      movieTop2.Category = responseJson[0].Category;
      movieTop2.Rank = responseJson[0].Rank;
      movieTop2.DetailShort = responseJson[0].DetailShort;
      movieTop2.Detail = responseJson[0].Detail;
      movieTop2.Image = responseJson[0].Image;
      movieTop2.ImageThumb = responseJson[0].ImageThumb;
      movieTop2.Trailer = responseJson[0].Trailer;

      short = responseJson[0].DetailShort.substr(0, 58) + '...';

      this.setState({
        movieTop: movieTop2,
        detailShort: short
      });
    })
    .catch((error)=> {
      console.error(error);
    });

    fetch("http://pttkht.esy.es/getMovieTop4.php")
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

const styles = StyleSheet.create({
  bg:{
    flex:1
  },

  nav:{
    width: width,
    height: 64,
    backgroundColor: 'black',
    flexDirection: 'row'
  },

  menu:{
    width:size23,
    height:size23,
    marginTop:size23,
    marginLeft:10
  },

  header:{
    width:width,
    height:height/2 - 64
  },

  imgBg:{
    width:width,
    height:height/2
  },

  content:{
    width:width,
    height:height/2 - 64,
    backgroundColor:'black',
    opacity:0.8,
    alignItems:'center'
  },

  container:{
    width:width - 50,
    height:height/2 - 100,
    flexDirection:'row',
    justifyContent:'center',
    paddingTop: 60
  },

  imgThumb:{
    width:width/3,
    height:height/2 - 64 - 80
  },

  info:{
    width:width/2,
    height:height/2-100
  },

  detailShort:{
    width:width/2 - 16,
    fontSize:sizeCategory,
    color:'white',
    fontWeight:'bold',
    justifyContent:'center',
    marginLeft:8,
    marginTop:2
  },

  popular:{
    width:width,
    height:height/2,
    backgroundColor:'black'
  },

  row:{
    marginTop:8,
    marginLeft:8,
  },

  rowImageThumb:{
    width:width/2,
    height:height/2 - (size40 + 60)
  },

  rowTitle:{
    backgroundColor:'white',
    width:width/2,
    height:size40,
    alignItems:'center'
  },

  title:{
    marginLeft:20,
    marginTop:25,
    fontSize:23,
    color:'white',
    fontWeight:'bold',
  },

  text:{
    marginLeft:8,
    marginTop:20,
    fontSize:sizeName,
    color:'white',
    fontWeight:'bold',
  },

  textQ:{
    flex:1/2,
    marginLeft:8,
    fontSize:sizeName,
    color:'white',
    fontWeight:'bold',
  },

  textSee:{
    fontSize:sizeName,
    color:'white',
    fontWeight:'bold',
    flex:1/2,
    textAlign:'right',
    marginRight:8
  },

  textCategory:{
    marginLeft:8,
    marginTop:10,
    fontSize:sizeCategory,
    color:'white',
    fontWeight:'bold',
  },

  imgStar:{
    width:height/20,
    height:height/20,
    marginLeft:4
  },

  textRank:{
    marginLeft:height/18,
    marginTop:-(height/25),
    fontSize:size,
    color:'white',
    fontWeight:'bold',
  },

  textDetail:{
    fontSize:sizeCategory,
    color:'white',
    fontWeight:'bold',
    justifyContent:'center',
  },

  btnView:{
    borderRadius:5,
    marginLeft:8,
    marginTop:4,
    backgroundColor:'red',
    width:100,
    height:hsizeViewDetail,
    alignItems:'center'
  },

  lst:{
    marginTop:8,
    backgroundColor:'black',
    flexDirection:'row'
  },

  textMovie:{
    marginLeft:8,
    marginTop:10,
    fontSize:sizeCategory,
    color:'black',
    justifyContent:'center',
    fontWeight:'bold',
  },

});
