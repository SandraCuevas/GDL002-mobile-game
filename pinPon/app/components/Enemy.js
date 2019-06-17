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

 export default class Enemy extends Component {
     render () {
         return (
             <Animated.Image source={this.props.enemyImg}
                style={{
                    height: 300,
                    width: 150,
                    position: 'absolute',
                    resizeMode: 'stretch',
                    left: this.props.enemyStartposX,
                    transform: [
                        { translateY: this.props.moveEnemyval},
                    ]
                }}></Animated.Image>
         )
     }
 }