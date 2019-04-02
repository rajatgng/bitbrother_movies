import React ,{Component}from 'react';
import { View,StyleSheet,Text,ActivityIndicator,ScrollView} from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, signupUser,nameChanged,phoneChanged } from '../src/actions/auth_action';
import { StackActions, NavigationActions } from 'react-navigation';
import { Input ,Button} from 'react-native-elements';
import {LinearGradient} from 'expo';
class SignUpScreen extends Component {
static navigationOptions = {
    
       title:'Driver : Sign Up',
       headerBackground: (
        <LinearGradient
          colors={['#5ED2A0', '#339CB1']}
          style={{ flex: 1 }}
          start={[0, 0]}
          end={[1, 0]}
        />
      ),
      };
    onNameChange = (text) => {
        this.props.nameChanged(text);
      }
    
      onEmailChange = (text) => {
        this.props.emailChanged(text);
      }
      onPhoneChange = (text) => {
        this.props.phoneChanged(text);
      }
    
      onPasswordChange = (text) => {
        this.props.passwordChanged(text);
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
   
  
      onButtonPress = () => {
        const { name, email, phone, password,} = this.props;
     
        this.props.signupUser({ name, email, phone, password});
       
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
            title="Create Account"
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
                keyboardType='email-address'
                inputContainerStyle={styles.comp3}
                placeholder='Name'
                placeholderTextColor='gray'
                onChangeText={this.onNameChange}
                value={this.props.name}
                leftIcon={{ type: 'material', name: 'person' }}
                />
                 <Input
                containerStyle={styles.comp}
                inputStyle={styles.comp2}
                inputContainerStyle={styles.comp3}
                placeholder='Email'
                placeholderTextColor='gray'
                onChangeText={this.onEmailChange}
                value={this.props.email}
                leftIcon={{ type: 'material', name: 'email' }}
                />
                <Input
                containerStyle={styles.comp}
                inputStyle={styles.comp2}
                inputContainerStyle={styles.comp3}
                placeholder='Phone'
                placeholderTextColor='gray'
                onChangeText={this.onPhoneChange}
                value={this.props.phone}
                leftIcon={{ type: 'material', name: 'phone' }}
                />
                <Input
                containerStyle={styles.comp}
                inputStyle={styles.comp2}
                inputContainerStyle={styles.comp3}
                placeholderTextColor='gray'
                placeholder='Password'
                onChangeText={this.onPasswordChange}
                secureTextEntry
                value={this.props.password}
                leftIcon={{ type: 'material', name: 'lock' }}
                />
                <Text style={{ color:'red',padding:10}}>
                {this.props.error}
                </Text> 
               {this.renderButton()}
                
                <Text style={{marginTop:50,fontSize:20}} >Already have an account? <Text style={{fontSize:23,color:'blue',textDecorationLine:'underline'}} onPress={() => this.props.navigation.navigate('Auth')}>Sign In</Text></Text> 

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
        
        alignItems:'center',
        width:'100%',padding:10
    },
    comp:{
        width:'100%',padding: 10,marginBottom: 15
    },
    comp2:{
        fontSize:20,paddingLeft: 10
    },
    comp3:{
        height:45,borderRadius: 20,
    },
    btn:{
        width:'60%',marginTop: 40,
    },
    btn2:{
        borderRadius:50,
    },
    btn3:{
        fontSize:20
    },
    
});
const mapStateToProps = ({ auth }) => {
    const { email, password, error, loading, token,phone,name} = auth;
    //console.log("Name is " + user.displayName );
    return { email, password, error, loading,token,phone,name};
    
}

export default connect(mapStateToProps, {
    emailChanged, passwordChanged, signupUser,nameChanged,phoneChanged
  })(SignUpScreen);
