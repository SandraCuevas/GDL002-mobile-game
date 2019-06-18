import { Navigation } from 'react-native';
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Animated,
    Image,
    ImageBackground,
    Button,
 } from 'react-native';


import FatherFly from './app/components/FatherFly';


export default class App extends Component {
  render () {
      return (
        <View style={styles.container}>
        <FatherFly/>
         
        </View>
      );
    }
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      position: 'relative',
      resizeMode: 'cover',
      justifyContent: 'center',
    }
});

AppRegistry.registerComponent('App', () => App);
