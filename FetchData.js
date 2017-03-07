import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  TouchableHighlight,
  Navigate
} from 'react-native';

import ImageScreen from './ImageScreen';

export default class FetchData extends Component {
  constructor(props){
    super(props);
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['Data not found'])
    };
  }

  getUrl(numberPage){
    const baseUrl = "https://api.500px.com/v1/photos?feature=popular&consumer_key=wB4ozJxTijCwNuggJvPGtBGCRqaZVcF6jsrzUadF";
    if (typeof numberPage === "number")
      return  baseUrl + "&" + "page=" + numberPage.toFixed();
    else
      return  baseUrl + "&" + "page=1";
  }

  fetchJson(numberPage){
    let url = this.getUrl(numberPage);
    let arrPhotos = [];
    return fetch(url).then((response) => response.json()).then((json) => {
          let photos = json.photos;
          for (let i = 0; i < photos.length; i++){
            arrPhotos.push([photos[i].image_url, photos[i].user.username, photos[i].height, photos[i].width]);
          }
        
          this.setState({dataSource: this.state.dataSource.cloneWithRows(arrPhotos)});
    });
  }
  
  _navigate(data){

    return this.props.navigator.push({
      name: 'Image',
      index: this.props.page,
      sendData:{
        data: data,
      }
    })
  }

  componentDidMount(){
    this.fetchJson(this.props.page);
  }

  render() {
    return (
      <View style={styles.box}>
        <View style={styles.viewLeft}>
          <View style={styles.viewButtonLeft}>
            <TouchableHighlight onPress={this.props.onBack} >
                <Image source={require('./image/left.png')}  style={styles.icon} />
            </TouchableHighlight>
          </View>
        </View>    
        <View style={styles.block}>     
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(data) => 
              <View style={styles.boxList}>
                <TouchableHighlight  onPress={() => this._navigate([data[0], data[2], data[3]])} data={data[0]} >
                  <Image  style={ styles.image } source={{uri: data[0]}} />
                </TouchableHighlight>  
                <Text> {data[1]} </Text>
              </View>
            }
            renderSeparator={(sectionID, rowID, adjacentRowHighlighted) => {
              <View style={styles.separator} /> 
            }}  
          />
        </View>
        <View style={styles.viewRight}>
          <View style={styles.viewButtonRight}>
            <TouchableHighlight onPress={this.props.onForward} >
              <Image source={require('./image/right.png')}  />
            </TouchableHighlight>
          </View>
        </View>  
      </View>  
    );
  }
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
    flexDirection: 'row',
  },
  boxList: {
    flex: 1,
    flexDirection: 'row',
  },
  image: {
    width: 150,
    height: 100,
    margin: 1,
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
  viewButtonLeft: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'center'
  },
  viewLeft: {
    flex: 1,
    backgroundColor: '#00002222',
    flexDirection: 'row',
  },
  viewButtonRight: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'center'
  },
  viewRight: {
    flex: 1,
    backgroundColor: '#00002222',
    flexDirection: 'row',
  },
  block: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    marginVertical: 5
  }
});