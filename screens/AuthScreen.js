import { LinearGradient } from 'expo';
import React ,{Component} from 'react';
import { View,StyleSheet,Text,ActivityIndicator,AsyncStorage,Image} from 'react-native';
import { emailChanged, passwordChanged, loginUser,} from '../src/actions/auth_action';
import { connect } from 'react-redux';
import { Input ,Button} from 'react-native-elements';
import { StackActions, NavigationActions } from 'react-navigation';



class AuthScreen extends Component {
  static navigationOptions={
    headerTitle:"Driver : Sign In",
    headerBackground: (
        <LinearGradient
          colors={['#5ED2A0', '#339CB1']}
          style={{ flex: 1 }}
          start={[0, 0]}
          end={[1, 0]}
        />
      ),
  }
    async componentWillMount(){
        const login_token = await AsyncStorage.getItem('login_token');    
        console.log(login_token);    
        if(login_token){
        this.props.navigation.navigate('Home');
        }
    }
    componentWillReceiveProps(nextProps){
        this.onAuthComplete(nextProps);
    }
    
    onAuthComplete(props){
        if(props.token){
            const resetAction = StackActions.reset({
                index: 0, 
                key: null,
                actions: [
                     NavigationActions.navigate({ routeName: 'Home' })
                ],
           });
           
           this.props.navigation.dispatch(resetAction);
            this.props.navigation.navigate('Home');
        }
    }
   
    onEmailChange = (text) => {
        this.props.emailChanged(text);
      }
    
      onPasswordChange = (text) => {
        this.props.passwordChanged(text);
      }
      
      onButtonPress = async () => {
        const { email, password } = this.props;
       
        this.props.loginUser({ email, password });
       }
    
      renderButton() {
        if (this.props.loading) {
          return <ActivityIndicator size="large" color="#0000ff" />;
        }
    
        return (
            <Button
            containerStyle={styles.btn}
            buttonStyle={styles.btn2}
            titleStyle={styles.btn3}
            title="Login"
            onPress={this.onButtonPress}
            />
        );
    }

    render(){
    return(
        <LinearGradient 
        style={{flex:1}} 
        locations={[0, 1.0]} 
        colors={['#5ED2A0', '#339CB1']}
        >

<View style={styles.container}>
            <View style={styles.insidecontainer}>
                <Input
                containerStyle={styles.comp}
                inputStyle={styles.comp2}
                inputContainerStyle={styles.comp3}
                placeholder='Email'
                placeholderTextColor='gray'
                keyboardType='email-address'
                onChangeText={this.onEmailChange}
                value={this.props.email}
                leftIcon={{ type: 'material', name: 'person' }}
                />
                <Input
                containerStyle={styles.comp}
                inputStyle={styles.comp2}
                inputContainerStyle={styles.comp3}
                placeholder='Password'
                placeholderTextColor='gray'
                onChangeText={this.onPasswordChange}
                secureTextEntry
                value={this.props.password}
                leftIcon={{ type: 'material', name: 'lock' }}
                />
                <Text style={{ color:'red',padding:10}}>
                {this.props.error}
                </Text> 
                {this.renderButton()}
                <Text 
                style={{marginTop:50,fontSize:20}}>
                Don't have an account? 
                <Text 
                style={{fontSize:23,color:'blue',textDecorationLine:'underline'}} 
                onPress={() => this.props.navigation.navigate('SignUp')}>
                Sign Up</Text>
                </Text>
            </View>
            
        </View>
        </LinearGradient>
       
    );  
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        padding:15,
        alignItems:'center',
        width:'100%'
    },
    insidecontainer:{
       flex:10,
        alignItems:'center',
        width:'100%',padding:10,
        marginTop:30
    },
    comp:{
        width:'100%',padding: 10,
    },
    comp2:{
        fontSize:20,paddingLeft: 10
    },
    comp3:{
        height:45,borderRadius: 20,
    },
    btn:{
        width:'60%',marginTop: 30,
    },
    btn2:{
        borderRadius:50,
    },
    btn3:{
        fontSize:20
    },
    logo:{
        flex:3
    }
});

const mapStateToProps = ( {auth} ) => {
    const { email, password, error, loading, token} = auth;
    return { email, password, error, loading,token};
    
}

export default connect(mapStateToProps, {
    emailChanged, passwordChanged, loginUser
  })(AuthScreen);