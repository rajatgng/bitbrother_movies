import React from 'react';
import { Provider } from "react-redux";
import {LinearGradient} from 'expo';
import store from './src/store';

import {createAppContainer,createSwitchNavigator,
  createStackNavigator,TabBarBottom,
  createBottomTabNavigator} from 'react-navigation';
import AuthScreen from './screens/AuthScreen';
import HomeScreen from './screens/HomeScreen';
import SignUpScreen from './screens/SignUpScreen';
import AddMovie from './screens/AddMovie';
import MovieInfo from './screens/MovieInfo';
import {firebaseConfig }from './Secret';
import firebase from 'firebase';
import { Ionicons } from '@expo/vector-icons';
import {Icon} from 'react-native-elements';


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
        tabBarLabel:"MOVIES",
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
              name={"md-add-circle"}
              size={focused?35:30}
              style={{ color: focused ? '#33A3F4' : '#949494'}}
          />
       
       ), 
      }
    },
  },
  {
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
      style: {
        backgroundColor:  '#f1f7ed',height:50,
      },
    },
    lazy: true,
    swipeEnabled: true,
    animationEnabled: true,
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

    firebase.initializeApp(firebaseConfig);
  }
  render() {
    return (
      <Provider store = {store}>
      <AppContainer/>
      </Provider>
  
    );
  }
}

