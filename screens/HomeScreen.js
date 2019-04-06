
import {Card ,Button,Icon,ListItem} from 'react-native-elements';
import {connect} from 'react-redux';
 import React,{Component} from 'react';
 import {signoutUser} from '../src/actions/auth_action'
 import { Text, View, StyleSheet,ListView,TouchableOpacity ,AsyncStorage} from 'react-native';
 import {LinearGradient} from 'expo';
 import _ from 'lodash';
 import {fetchMovies,fetchComment,likesAdded} from '../src/actions/movies_action';
import firebase from 'firebase';
  class HomeScreen extends Component{ 

    
    componentWillMount(){  
      this.props.fetchMovies();
      this.createDataSource(this.props.movies)
    };

    componentWillReceiveProps(nextProps){
      this.createDataSource(nextProps); 
    }
   
    async  componentDidMount(){

    this.props.navigation.setParams({ signoutuser: this.signout_User });
    }

    static navigationOptions = ({navigation,state }) => {
      return{
       headerTitle:"Movies",
       headerStyle: {height: 40},
       headerBackground: (
           <LinearGradient
             colors={['#5ED2A0', '#339CB1']}
             style={{ flex: 1 }}
             start={[0, 0]}
             end={[1, 0]}
           />
         ),
           headerRight: //<Button title='Log Out ' onPress={()=>{const p = navigation.getParam('signoutuser');p()}} />
           <TouchableOpacity
           style={styles.button}
           onPress={()=>{const p = navigation.getParam('signoutuser');p()}}
         >
           {/* Apply inactive style if no input */}
           <Text style={styles.text}>Log out</Text>
         </TouchableOpacity>
      };
    }
    createDataSource(props){
      const moviesdata = _.map(props.movies,(val,uid)=>{
        return {...val,uid}
     });
     moviesdata.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)); 
   
      const ds = new ListView.DataSource({
        rowHasChanged:(r1,r2) => r1!=r2
      });
      this.dataSource = ds.cloneWithRows(moviesdata)
    }
  
    signout_User = async ()=>{
      await this.props.signoutUser();
      this.props.navigation.navigate('Auth');
    }
   btnAction =  (movie) =>{
   
    this.props.navigation.navigate('MovieInfo',{movie:movie});
   }
   likeAction = (movie) =>{
   
    var arr = _.values(movie.likes);
    let hashMap = {}
    for(var employee of arr){
      if(employee.likeduser in hashMap ){
      hashMap[employee.likeduser] = hashMap[employee.likeduser] + 1;  
      }else{
       hashMap[employee.likeduser] = 1;
      }
    }
    
   
    let outputArray = []
    let isCompleted=false
    Object.keys(hashMap).forEach((key) => {  
      isCompleted=this.matchUser(key);
      outputArray.push({
        key,
        count: hashMap[key]
      })
    })
  
    if(isCompleted===false){
        this.props.likesAdded(movie.uid);
    }
   }
  matchUser = (key) =>{
    const {currentUser} = firebase.auth();
      if(key===currentUser.uid){
       return true;
      }
      return false;
   }
   renderRow =  (movie) =>{
    var arr = _.values(movie.likes);
    let hashMap = {}
    for(var employee of arr){
      if(employee.likeduser in hashMap ){
      hashMap[employee.likeduser] = hashMap[employee.likeduser] + 1;  
      }else{
       hashMap[employee.likeduser] = 1;
      }
    }
    
    let outputArray = []
    let isCompleted=false
    Object.keys(hashMap).forEach((key) => {  
      isCompleted=this.matchUser(key);
      outputArray.push({
        key,
        count: hashMap[key]
      })
    })

     return (
      
     <View style={styles.container}>  
     
        <View>
          <Card
           title={`${movie.name}(${movie.year})`}
           titleStyle={styles.titleStyle}
           image={require('../assets/movie.jpg')}
           containerStyle={{backgroundColor:'#f6f7f4'}}>
          
           <View style = {{flexDirection:'row',justifyContent:'space-between',alignItems: 'flex-start',}}>

           <Text style={{marginBottom: 10,fontSize:20}}>
            {movie.genre}
           </Text>
           <View style = {{flexDirection:'row'}}>
           <Icon
              name="thumbs-up"
              color={isCompleted ? '#DE5347' : '#ccc'}
              type='font-awesome'
              size={25}
              onPress={() => {this.likeAction(movie)}}
            />
            <Text style={{fontSize:20,marginLeft:2,paddingTop:2}}>{outputArray.length}</Text>
           </View>
          
           </View>
           <Button
             onPress = {()=>{this.btnAction(movie)}}
             icon={<Icon name='code' color='#ffffff' />}
             backgroundColor='#03A9F4'
             buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
             title='See Details' 
             />
          
         </Card>
       </View>
     
     </View>
     );
   }
    render(){
      return(
        <LinearGradient
        colors={['#5ED2A0', '#339CB1']}
        style={{ flex: 1 }}
        start={[0, 0]}
        end={[1, 0]}
      >
        <ListView
        enableEmptySections
        dataSource={this.dataSource}
        renderRow={this.renderRow}
        />
        </LinearGradient>
      );
  }
 }
 const styles = StyleSheet.create({
   container:{
     flex: 1,
   //backgroundColor: 'linear-gradient(-225deg, #231557 0%, #44107A 29%, #FF1361 67%, #FFF800 100%)',
   marginBottom:1
   },
   viewStyle: {
     justifyContent: 'center',
     flex: 1,
     backgroundColor:'white',
     //marginTop: Platform.OS == 'ios'? 30 : 0
   },
   textStyle: {
     padding: 10,
   },
   titleStyle:{
     fontSize:20,
     fontWeight: 'bold',
   },
   button: {
    height: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  text: {
    color: '#3F51B5',
    fontWeight: 'bold',
   
    textAlign: 'center',
    fontSize: 20,
  },
   
 });
 
 const mapStateToProps = ({movie}) =>{
    const { movies ,user} = movie;
   return {movies,user};
 }
 export default connect(mapStateToProps, {
   signoutUser,fetchMovies,fetchComment,likesAdded,
 })(HomeScreen);