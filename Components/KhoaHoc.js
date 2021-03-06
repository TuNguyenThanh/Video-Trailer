import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
  TouchableOpacity,
  Alert
} from 'react-native';

export default class KhoaHoc extends Component {
  constructor(props){
    super(props);
    this.state = {
      mang:[],
      dataSource: new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!=r2})
    };
  }

  clickMe(e){
    Alert.alert(
      'Ban da chon',
      e,
      [
        {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]
    )
  }

  render() {
    return (
      <ListView
        horizontal={true}
        dataSource={this.state.dataSource}
        renderRow={(rowData) =>
          <View style={{marginTop:64, marginLeft:10}}>
            <TouchableOpacity onPress={()=>{this.clickMe(rowData.Ten)}}>
              <Text>{rowData.Ten}</Text>
            </TouchableOpacity>

            <Image
              style={{width: 100, height: 130}}
              source={{uri: rowData.Hinh}}
            />
          </View>
        }
      />
    );
  }

  componentDidMount(){

    fetch("http://localhost/stu/test.php")
    .then((response)=> response.json())
    .then((responseJson)=>{
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(responseJson)
      });
    })
    .catch((error)=>{
      console.error(error);
    });

  };
}
