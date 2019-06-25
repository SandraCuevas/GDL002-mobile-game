import React, { Component } from 'react';
import {View,  StyleSheet, Button, ImageBackground } from "react-native";

class Home extends Component{
    render(){
        return (
            <ImageBackground source = {require ('../img/bgImage.gif')} style = {styles.container}>
            <View>
                <Button title="Play" onPress={() => this.props.navigation.navigate("Game")}/>
            </View>
            
            </ImageBackground>
        );
    }
}
 export default Home;

 const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center"
    }
});
