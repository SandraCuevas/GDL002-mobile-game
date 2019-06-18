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

 } from 'react-native';

 export default class Welcome extends Component {
     render () {
         return (
             <View style={styles.container}>
                 <Text>Don't let fly die</Text>
             </View>
         )
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