import React from 'react';
import { Provider } from "react-redux";
import {LinearGradient} from 'expo';
import store from './src/store';
import { StyleSheet, Text, View } from 'react-native';
import {createAppContainer,createSwitchNavigator,createStackNavigator,createBottomTabNavigator} from 'react-navigation';
import AuthScreen from './screens/AuthScreen';
import HomeScreen from './screens/HomeScreen';
import SignUpScreen from './screens/SignUpScreen';
import AddMovie from './screens/AddMovie';
import MovieInfo from './screens/MovieInfo';
//import config from './src/Secret';
import firebase from 'firebase';
import { Ionicons } from '@expo/vector-icons';
const AuthStack = createStackNavigator({
  Auth:AuthScreen,
  SignUp:SignUpScreen
  });
const HomeStack  = createStackNavigator({
  Home:HomeScreen,
  MovieInfo:MovieInfo
});
const MainScreen = createBottomTabNavigator(
  {
    Home : {
      screen : HomeStack,
      navigationOptions: {
        tabBarLabel:"MY MOVIES",
        tabBarIcon: ({focused}) => (
          <Ionicons
              name={focused ? 'ios-home' : 'md-home'}
              size={35}
              style={{ color: focused ? '#33A3F4' : '#949494'}}
          />
      ),
      }
    },
    AddMovie : {screen : AddMovie,
      navigationOptions: {
        tabBarLabel:"ADD MOVIE",
        tabBarIcon: ({focused}) => (
          <Ionicons
              name={"ios-cloud"}
              size={focused?35:30}
              style={{ color: focused ? '#33A3F4' : '#949494'}}
          />
      ),
      }
    },
  }
  );
  
const AppContainer = createAppContainer(createSwitchNavigator(
  {
    Auth: AuthStack,
    Home: MainScreen
  },
  {
    initialRouteName: 'Auth',
    headerBackground: (
      <LinearGradient
        colors={['#5ED2A0', '#339CB1']}
        style={{ flex: 1 }}
        start={[0, 0]}
        end={[1, 0]}
      />
    ),
  },

));

export default class App extends React.Component {
  componentWillMount(){
    var config = {
      apiKey: "AIzaSyBTcH3cSf3NJ6BzVV73A4W8GgI06lCL22s",
      authDomain: "jbyc-76af5.firebaseapp.com",
      databaseURL: "https://jbyc-76af5.firebaseio.com",
      projectId: "jbyc-76af5",
      storageBucket: "jbyc-76af5.appspot.com",
      messagingSenderId: "959852895436"
    };
  
    firebase.initializeApp(config);
  }
  render() {
    return (
      <Provider store = {store}>
      <AppContainer/>
      </Provider>
  
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
