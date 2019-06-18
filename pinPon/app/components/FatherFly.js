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

import Enemy from './Enemy';

export default class FatherFly extends Component {

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
      <ImageBackground source = {require ('../img/bgImage.jpg')} style = {styles.container}>

      <View style = {{ flex:1, alignItems: 'center', marginTop: 60}}>
            <View style = {styles.points}>
                  <Text style = {{fontWeight: 'bold', fontSize:40, color: '#fff'}}> 
                  {this.state.points}
                  </Text>

            </View>
      </View>

          <Animated.Image source={require('../img/Fly.gif')} 
              style={{
                height: 70,
                width: 70,
                position: 'absolute',
                zIndex: 1,
                bottom: 10,
                resizeMode: 'stretch',
                transform: [
                  { translateX: this.state.movePlayerVal },
                ],
          }}></Animated.Image>

          <Enemy enemyImg={require('../img/matamoscas.gif')} 
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
    var windowH = Dimensions.get('window').height;

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
    //interval to check for collision each 50 ms

    var refreshIntervalId;
    refreshIntervalId= setInterval (()=> {

      //collision logic

      // if the enemy collides with player and they are on the same side
      // -- and the enemy has not passed the play safely
      if (this.state.moveEnemyval._value > windowH - 280
        && this.state.moveEnemyval._value < windowH - 180
        && this.state.playerSide == this.state.enemySide) {
          
            clearInterval(refreshIntervalId)
            this.setState({gameOver:true});
            this.gameOver();
        }

    }, 50);
    //increase enemy speed each 4th second
    setInterval (()=>{
      this.setState({ enemySpeed: this.state.enemySpeed -100})

    }, 4000);
    //animate the enemy
    Animated.timing(
      this.state.moveEnemyval,
      {
        toValue: Dimensions.get('window').height,
        duration: this.state.enemySpeed,

      }

    ).start(event => {
      //if not collision is detected, restart the enemy animation
      if(event.finished && this.state.gameOver == false) {
        clearInterval(refreshIntervalId);
        this.setState({ points: ++ this.state.points });
        this.animateEnemy();
      }
    });
  }
  gameOver (){
    alert('You lost bigtime!')    
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
      width: 90,
      height: 50,
      backgroundColor: '#CF9357',
      opacity: 0.9,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      paddingBootom:'10px',
      
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
