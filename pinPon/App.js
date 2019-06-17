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

import Enemy from './app/components/Enemy';


export default class App extends Component {

  constructor (props){
    super(props);
    this.state = {
      movePlayerVal: new Animated.Value(40),
      playerSide: 'left',
      points: 0,

      moveEnemyval: new Animated.Value(0),
      enemyStartposX: 0,
      enemySide: 'left',
      enemySpeed: 4200,

      gameOver: false,

    };
  }

  render () {
    return (
      <ImageBackground source = {require ('./app/img/bgImage.jpg')} style = {styles.container}>

      <View style = {{ flex:1, alignItems: 'center', marginTop: 80}}>
            <View style = {styles.points}>
                  <Text style = {{fontWeight: 'bold', fontSize:40}}> 
                  {this.state.points}
                  </Text>

            </View>
      </View>

          <Animated.Image source={require('./app/img/Fly.gif')} 
              style={{
                height: 100,
                width: 100,
                position: 'absolute',
                zIndex: 1,
                bottom: 50,
                resizeMode: 'stretch',
                transform: [
                  { translateX: this.state.movePlayerVal },
                ],
          }}></Animated.Image>

          <Enemy enemyImg={require('./app/img/matamoscas.png')} 
          enemyStartposX={this.state.enemyStartposX}
          moveEnemyval={this.state.moveEnemyval}/>
          
          <View style= {styles.controls}>
              <Text style={styles.left} onPress={ () => this.movePlayer('left')}>{'<'}</Text>
              <Text style={styles.right} onPress={ () => this.movePlayer('right')}>{'>'}</Text>
          
          </View>

      </ImageBackground>
    );
  }
  movePlayer(direction) {
    //Move player right
    if (direction == 'right') {

        this.setState({ playerSide: 'right'});

        Animated.spring(

          this.state.movePlayerVal,
          {
            toValue: Dimensions.get('window').width - 140,
            tension: 120,
          }

        ).start();
        
    } else if (direction == 'left') {
      this.setState({ playerSide: 'left'});

      Animated.spring(

        this.state.movePlayerVal,
        {
          toValue: 40,
          tension: 120,
        }
        ).start();
    }
  }
  componentDidMount(){
    this.animateEnemy();
  }
  animateEnemy(){
    this.state.moveEnemyval.setValue(-100);
    var windhowH = Dimensions.get('window').height;

    //generate  left distance for enemy

    var r = Math.floor(Math.random()* 2) + 1;

    if (r == 2) {
        r = 40;
        this.setState({ enemySide: 'left'   });
    }
    else {
      r = Dimensions.get('window').width -140;
      //enemy is on the right
      this.setState({ enemySide: 'right'});
    }
    this.setState({ enemyStartposX: r});

    var refreshIntervalId;
    refreshIntervalId= setInterval (()=> {

      //collision logic

    }, 50);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    resizeMode: 'cover',
    justifyContent: 'center',
  },
    points: {
      width: 80,
      height: 80,
      backgroundColor: '#fff',
      borderRadius: 100,
      alignItems: 'center',
      justifyContent: 'center',
    },
  
    controls: {
      alignItems: 'center',
      flexDirection: 'row',
  },
    right: {
        flex:1,
        color:'#fff',
        margin: 0,
        fontSize: 60,
        fontWeight: 'bold',
        textAlign:'left',
    },

    left: {
      flex:1,
      color:'#fff',
      fontSize: 60,
      fontWeight: 'bold',
      textAlign:'right',
    }

});

AppRegistry.registerComponent('App', () => App);