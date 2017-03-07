import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
  TouchableHighlight,
} from 'react-native';


import FetchData from './FetchData';

export default class ImageScreen extends Component {
  constructor(props){
    super(props);
  }

  _navigateImage(data){
    this.props.navigator.jumpBack(data);
  }

  render() {
    return (
        <View style={{flex: 1}} >
          <TouchableHighlight  onPress={() => this._navigateImage(this.props.page)} >
            <Image
              style={{
                width: 150, //this.props.data[1],
                height: 100 //this.props.data[2]
              }}
              source={{uri: this.props.data[0]}}
            />
          </TouchableHighlight>
        </View>
      );
  }
}