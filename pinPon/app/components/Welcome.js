import React, { Component } from 'react';
import {View,  StyleSheet, Button, } from "react-native";

class Home extends Component{
    render(){
        return (
            <View style={styles.container}>
                <Button title="Play" onPress={() => this.props.navigation.navigate("Game")}/>
            </View>
            

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
