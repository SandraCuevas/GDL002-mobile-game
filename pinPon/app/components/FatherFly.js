import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    Animated,
    ImageBackground,
    Alert,
 } from 'react-native';

import Enemy from './Enemy';
import Enemy2 from './Enemy2';

export default class FatherFly extends Component {
static navigationOptions = {
  title: 'Game',
};
  constructor (props){
    super(props);
    this.state = {
      movePlayerVal: new Animated.Value(0),
      playerSide: 'left',
      points: 0,

      moveEnemyval: new Animated.Value(0),
      enemyStartposX: -100,
      enemySide: 'left',
      enemySpeed: 5000,

      playerSide2: 'left',
      moveEnemyval2: new Animated.Value(0),
      enemyStartposX2: -200,
      enemySide2: 'left',
      enemySpeed2: 20000,



      gameOver: false,

    };
    this.movePlayer = this.movePlayer.bind(this);
    this.gameOver = this.gameOver.bind(this);
    this.animateEnemy = this.animateEnemy.bind(this);
  }

  render () {
    return (
      <ImageBackground source = {require ('../img/bgMantel.png')} style = {styles.container}>
      <ImageBackground source = {require ('../img/bgMantel.gif')} style = {styles.container}>

      <View style = {{ flex:1, alignItems: 'center', marginTop: 60}}>
            <View style = {styles.points}>
                  <Text style = {{fontWeight: 'bold', fontSize:40, color: '#fff'}}> 
                  {this.state.points}
                  </Text>

            </View>
      </View>

          <Animated.Image source={require('../img/Fly.gif')} 
              style={{
                height: 80,
                width: 80,
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

          <Enemy2 enemyImg={require('../img/raid.png')} 
          enemyStartposX={this.state.enemyStartposX2}
          moveEnemyval={this.state.moveEnemyval2}/>
          
          <View style= {styles.controls}>
              <Text style={styles.left} onPress={ () => this.movePlayer('left')}>{'⬅'}</Text>
              <Text style={styles.right} onPress={ () => this.movePlayer('right')}>{'➡'}</Text>
          
          </View>
    
      </ImageBackground>
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
    this.animateEnemy2();
  }

  componentWillUnmount(){
    this.animateEnemy();
    this.animateEnemy2();
  }
  

  gameOver (router){
    Alert.alert(
      'Game Over',
      'Go BACK to try Again',
      [
        {text: 'try again', onPress: () => { router.navigate("Home")}},
        {text: 'Out', onPress: () => {router.navigate("Home")}},
      ]
    )    
  }
  animateEnemy(){
    this.state.moveEnemyval.setValue(-300);
    let windowH = Dimensions.get('window').height;

    //generate  left distance for enemy

    let r = Math.floor(Math.random()* 2) + 1;

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

      let refreshIntervalId;
    refreshIntervalId= setInterval (() => {

      //collision logic

      // if the enemy collides with player and they are on the same side
      // -- and the enemy has not passed the play safely
      if (this.state.moveEnemyval._value > windowH - 280
        && this.state.moveEnemyval._value < windowH - 180
        && this.state.playerSide == this.state.enemySide) {
          

            clearInterval(refreshIntervalId)
            this.setState({gameOver:true});
            this.gameOver(this.props.navigation);
        }

    }, 50);
    //increase enemy speed each 4th second
    setInterval (()=>{
      this.setState({ enemySpeed: this.state.enemySpeed - 50})

    }, 20000);
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
  animateEnemy2(){
    this.state.moveEnemyval2.setValue(-400);
    let windowH = Dimensions.get('window').height;

    //generate  left distance for enemy

    let r = Math.floor(Math.random()* 1) + 1;

    if (r == 2) {
        r = 80;
        this.setState({ enemySide2: 'left'   });
    }
    else {
      r = Dimensions.get('window').width -140;
      //enemy is on the right
      this.setState({ enemySide2: 'right'});
    }
    this.setState({ enemyStartposX2: r});
    //interval to check for collision each 50 ms

      let refreshIntervalId;
    refreshIntervalId= setInterval (() => {

      //collision logic

      // if the enemy collides with player and they are on the same side
      // -- and the enemy has not passed the play safely
      if (this.state.moveEnemyval2._value > windowH - 280
        && this.state.moveEnemyval2._value < windowH - 180
        && this.state.playerSide2 == this.state.enemySide2) {
          

            clearInterval(refreshIntervalId)
            this.setState({gameOver:true});
            this.gameOver(this.props.navigation);
        }

    }, 50);
    //increase enemy speed each 4th second
    setInterval (()=>{
      this.setState({ enemySpeed2: this.state.enemySpeed2 - 50})

    }, 20000);
    //animate the enemy
    Animated.timing(
      this.state.moveEnemyval2,
      {
        toValue: Dimensions.get('window').height,
        duration: this.state.enemySpeed2,

      }

    ).start(event => {
      //if not collision is detected, restart the enemy animation
      if(event.finished && this.state.gameOver == false) {
        clearInterval(refreshIntervalId);
        this.setState({ points: ++ this.state.points });
        this.animateEnemy2();
      }
    });
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
    },
  
    controls: {
      alignItems: 'center',
      justifyContent:'center',
      flexDirection: 'row',
      bottom:10,
  },
    right: {
        flex:1,
        color:'#fff',
        margin: 0,
        fontSize: 50,
        fontWeight: 'bold',
        textAlign:'right',
    },

    left: {
      flex:1,
      color:'#fff',
      fontSize: 50,
      fontWeight: 'bold',
      textAlign:'left',
    }

});

