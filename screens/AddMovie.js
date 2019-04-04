import React ,{Component} from 'react';
import { View,StyleSheet,Text,Keyboard} from 'react-native';
import {LinearGradient} from 'expo';
import {Input,Button} from 'react-native-elements';
import {connect} from 'react-redux';
import {movieAdded,movieNameChanged,movieYearChanged,movieGenreChanged,movieDescChanged,movieLangChanged} from '../src/actions/movies_action';
class AddMovie extends Component{

    onButtonPress = () => {
        Keyboard.dismiss();
        const {name,year,genre,desc,lang} = this.props
        this.props.movieAdded({name,year,genre,desc,lang});
        this.props.navigation.navigate('Home');
      }
    onNameChange = (text) => {
        this.props.movieNameChanged(text);
    }
    onYearChange = (text) =>{
        this.props.movieYearChanged(text);
    }
    onGenreChange = (text) =>{
        this.props.movieGenreChanged(text);
    }
    onDescChange = (text) =>{
        this.props.movieDescChanged(text);
    }
    onLangChange = (text) =>{
        this.props.movieLangChanged(text);
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
                placeholder='Year Released'
                placeholderTextColor='gray'
                onChangeText={this.onYearChange}
                value={this.props.year}
                leftIcon={{ type: 'material', name: 'email' }}
                />
                <Input
                containerStyle={styles.comp}
                inputStyle={styles.comp2}
                inputContainerStyle={styles.comp3}
                placeholder='Genre'
                placeholderTextColor='gray'
                onChangeText={this.onGenreChange}
                value={this.props.genre}
                leftIcon={{ type: 'material', name: 'phone' }}
                />
                <Input
                containerStyle={styles.comp}
                inputStyle={styles.comp2}
                inputContainerStyle={styles.comp3}
                placeholderTextColor='gray'
                placeholder='Description'
                onChangeText={this.onDescChange}
                value={this.props.desc}
                leftIcon={{ type: 'material', name: 'lock' }}
                />
                 <Input
                containerStyle={styles.comp}
                inputStyle={styles.comp2}
                inputContainerStyle={styles.comp3}
                placeholderTextColor='gray'
                placeholder='Language'
                onChangeText={this.onLangChange}
                value={this.props.lang}
                leftIcon={{ type: 'material', name: 'lock' }}
                />
                <Text style={{ color:'red',padding:10}}>
                {this.props.error}
                </Text> 
               {/* {this.renderButton()} */}
               <Button
            containerStyle={styles.btn}
            buttonStyle={styles.btn2}
            titleStyle={styles.btn3}
            title="Add Movie"
            onPress={this.onButtonPress}
            />
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
        width:'60%',marginTop: 10,
    },
    btn2:{
        borderRadius:50,
    },
    btn3:{
        fontSize:20
    },
    
});
const mapStateToProps = ( {movie} ) => {
    const {name,year,genre,desc,lang} = movie
    return { name,year,genre,desc,lang};
    
  }
  
export default connect(mapStateToProps,{
    movieAdded,movieNameChanged,movieYearChanged,movieGenreChanged,movieDescChanged,movieLangChanged
})(AddMovie);


