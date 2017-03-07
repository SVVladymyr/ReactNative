/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';

import FetchData from './FetchData';
import Image from './ImageScreen';

export default class FotoGallery extends Component {
  render() {
    return (
      <Navigator
        initialRoute={{ title: 'My Initial Scene', index: 1, name: 'Navigation'}}
        renderScene={(route, navigator) => {
          if(route.name == 'Image'){
            return <Image route={route} navigator={navigator} page={route.index} data={route.sendData.data} /> 
          }

          if(route.name == 'Navigation'){
            return <FetchData 
              page = {route.index}
              navigator = {navigator}
              // Function to call when a new scene should be displayed           
              onForward={() => {    
                const nextIndex = route.index + 1;
                navigator.push({
                  title: 'Scene ' + nextIndex,
                  index: nextIndex,
                  name: 'Navigation',
                });
              }}

              // Function to call to go back to the previous scene
              onBack={() => {
                if (route.index > 0) {
                  navigator.pop();
                }
              }}
            />
          }
        }}
      />
    );
  }
}

AppRegistry.registerComponent('FotoGallery', () => FotoGallery);
