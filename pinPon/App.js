import React from "react";
import {createStackNavigator, createAppContainer} from "react-navigation";
import Home from "./app/components/Welcome";
import Game from "./app/components/FatherFly";


export default class App extends React.Component{
  render(){
    return(
      <AppContainer/>
    );
  }
}

const AppStackNavigation = createStackNavigator ({
  Home: {
    screen: Home,
    navigationOptions: {
      header: null,
  },
  },
  Game: {
    screen: Game,
       navigationOptions: {
      
  },
  }
});

const AppContainer = createAppContainer(AppStackNavigation);
